import fs from 'node:fs';

import { Order } from '@/database/schemas/order.schema';
import { User } from '@/database/schemas/user.schema';
import { Parser } from '@json2csv/plainjs/index.js';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ExportDatabaseDto } from './dto/export-database.dto';

@Injectable()
export class ExportService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async exportToCsv(
    data: (User | Order)[],
    fields: string[],
    filename: string,
  ) {
    const parser = new Parser({ fields, withBOM: true });
    const csv = parser.parse(data);
    fs.writeFileSync(filename, csv, 'utf-8');
    return filename;
  }

  async saveDatabase(exportDatabaseDto: ExportDatabaseDto) {
    if (exportDatabaseDto.users) {
      const users = await this.userModel.find().exec();
      const fields = [
        'name',
        'phone',
        'email',
        'password',
        'role',
        'createdAt',
        'updatedAt',
      ];
      return this.exportToCsv(users, fields, 'users.csv');
    }
    if (exportDatabaseDto.orders) {
      const orders = await this.orderModel.find().exec();
      const fields = [
        'customerId',
        'tailorId',
        'items',
        'status',
        'comments',
        'totalPrice',
        'createdAt',
        'updatedAt',
      ];
      return this.exportToCsv(orders, fields, 'orders.csv');
    }
    throw new Error('No data type specified for export.');
  }
}
