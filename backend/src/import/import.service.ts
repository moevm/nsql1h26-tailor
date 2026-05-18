import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Order } from '@/database/schemas/order.schema';
import { User } from '@/database/schemas/user.schema';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import csv from 'csv-parser';
import { Model } from 'mongoose';

import { ImportDatabaseDto } from './dto/import-database.dto';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async importToCollection<T>(
    filePath: string,
    model: Model<T>,
  ): Promise<void> {
    const rows = await this.readCsvFile(filePath);
    this.assertCsvMatchesModel(rows, model);
    const normalizedRows = rows.map((row) => this.normalizeRow(row));
    this.validateRows(normalizedRows, model);

    await model.deleteMany({});
    try {
      await model.insertMany(normalizedRows);
    } catch (error) {
      this.logger.error('Error importing data:', error);
      throw new BadRequestException('Failed to import data.');
    }
  }

  async readCsvFile(filePath: string): Promise<Array<Record<string, string>>> {
    return new Promise((resolve, reject) => {
      const results: Array<Record<string, string>> = [];

      createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: Record<string, string>) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  getCsvFields<T>(model: Model<T>): string[] {
    return Object.keys(model.schema.paths).filter(
      (key) => !key.includes('.') && !['_id', '__v'].includes(key),
    );
  }

  assertCsvMatchesModel<T>(
    rows: Array<Record<string, string>>,
    model: Model<T>,
  ): void {
    if (rows.length === 0) {
      throw new BadRequestException('CSV file is empty.');
    }

    const expectedFields = this.getCsvFields(model);
    const actualFields = Object.keys(rows[0]).map((key) =>
      this.normalizeKey(key),
    );

    const missingFields = expectedFields.filter(
      (field) => !actualFields.includes(field),
    );
    const unexpectedFields = actualFields.filter(
      (field) => !expectedFields.includes(field),
    );

    if (missingFields.length > 0 || unexpectedFields.length > 0) {
      throw new BadRequestException(
        'CSV file does not match selected dataset.',
      );
    }
  }

  validateRows<T>(rows: Array<Record<string, unknown>>, model: Model<T>) {
    for (const row of rows) {
      const validationError = new model(row).validateSync();

      if (validationError) {
        throw new BadRequestException(
          'CSV file does not match selected dataset.',
        );
      }
    }
  }

  normalizeKey(key: string): string {
    return key
      .replace(/^\uFEFF/, '')
      .replace(/^[\s"\\]+|[\s"\\]+$/g, '')
      .trim();
  }

  normalizeRow(row: Record<string, string>): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        this.normalizeKey(key),
        this.parseArrayValue(value),
      ]),
    );
  }

  parseArrayValue(value: string) {
    const normalizedValue = this.normalizeCsvText(value);

    if (!normalizedValue) {
      return undefined;
    }

    const isArray =
      normalizedValue.startsWith('[') && normalizedValue.endsWith(']');
    const isDict =
      normalizedValue.startsWith('{') && normalizedValue.endsWith('}');

    if (isArray || isDict) {
      return JSON.parse(normalizedValue);
    }

    return value;
  }

  normalizeCsvText(value: string): string {
    return value
      .trim()
      .replace(/^"+|"+$/g, '')
      .replace(/^\\+|\\+$/g, '')
      .replace(/\\"/g, '"');
  }

  async importDatabase(
    file: Express.Multer.File,
    importDatabaseDto: ImportDatabaseDto,
  ) {
    const filePath = join(process.cwd(), file.originalname);
    await writeFile(filePath, file.buffer);

    if (importDatabaseDto.users) {
      await this.importToCollection(filePath, this.userModel);
      return { imported: 'users' };
    }

    if (importDatabaseDto.orders) {
      await this.importToCollection(filePath, this.orderModel);
      return { imported: 'orders' };
    }

    throw new BadRequestException(
      'Select exactly one dataset: users or orders.',
    );
  }
}
