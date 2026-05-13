import { createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Order } from '@/database/schemas/order.schema';
import { User } from '@/database/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import csv from 'csv-parser';
import { Model } from 'mongoose';

import { ImportDatabaseDto } from './dto/import-database.dto';

@Injectable()
export class ImportService {
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
    const normalizedRows = rows.map((row) => this.normalizeRow(row));

    await model.deleteMany({});
    try {
      await model.insertMany(normalizedRows);
    } catch (error) {
      console.error('Error importing data:', error);
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

  normalizeKey(key: string): string {
    return key.replace(/^[\s"\\]+|[\s"\\]+$/g, '').trim();
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

  async importDatabase(file: any, importDatabaseDto: ImportDatabaseDto) {
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
