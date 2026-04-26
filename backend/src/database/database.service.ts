import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from './schemas/order.schema';
import { User } from './schemas/user.schema';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  async onModuleInit() {
    if (!(await this.userModel.exists({}))) {
      await this.seedUsers();
    }

    if (!(await this.orderModel.exists({}))) {
      await this.seedOrders();
    }
  }

  private async seedUsers() {
    const users = [
      {
        name: { firstName: 'customer', lastName: 'customer', patronymic: 'customer' },
        phone: '+71111111111',
        email: 'customer@mail.com',
        password: {
          hash: '$2a$13$imhLgqVT1BymN7HVsxhkI.EIatca9T3YxNDvNjsp0ICR0KQ1AWvuK',
          salt: 'salt',
        },
        role: 'customer',
      },
      {
        name: { firstName: 'tailor', lastName: 'tailor', patronymic: 'tailor' },
        phone: '+72222222222',
        email: 'tailor@mail.com',
        password: {
          hash: '$2a$13$/D2AkhMzUkNjUF5roKeqyOyZJsXnQ3Wxt69iGJzNZBaTKRlUr/IaS',
          salt: 'salt',
        },
        role: 'tailor',
      },
      {
        name: { firstName: 'tailor2', lastName: 'tailor2', patronymic: 'tailor2' },
        phone: '+74444444444',
        email: 'tailor2@mail.com',
        password: {
          hash: '$2a$13$/D2AkhMzUkNjUF5roKeqyOyZJsXnQ3Wxt69iGJzNZBaTKRlUr/IaS',
          salt: 'salt',
        },
        role: 'tailor',
      },
      {
        name: { firstName: 'manager', lastName: 'manager', patronymic: 'manager' },
        phone: '+73333333333',
        email: 'manager@mail.com',
        password: {
          hash: '$2a$13$bw25qS0HjLgUBwTAtN1QtewDSVa52fTXBOwBkTrOPAXB/szU3ND8C',
          salt: 'salt',
        },
        role: 'manager',
      },
    ];

    await this.userModel.insertMany(users);
    this.logger.log('Successfully seeded test users.');
  }

  private async seedOrders() {
    const customer = await this.userModel.findOne({ email: 'customer@mail.com' });
    const tailor1 = await this.userModel.findOne({ email: 'tailor@mail.com' });
    const tailor2 = await this.userModel.findOne({ email: 'tailor2@mail.com' });

    if (!customer || !tailor1 || !tailor2) {
      this.logger.warn('Cannot seed orders: required users not found.');
      return;
    }

    const orders = [
      {
        customerId: customer._id,
        tailorId: tailor1._id,
        status: 'in_progress',
        items: [{ name: 'Платье', description: 'Укоротить платье', quantity: 1, price: 5000 }],
        totalPrice: 5000,
      },
      {
        customerId: customer._id,
        tailorId: tailor1._id,
        status: 'done',
        items: [{ name: 'Юбка', description: 'Подшить юбку', quantity: 1, price: 3000 }],
        totalPrice: 3000,
      },
      {
        customerId: customer._id,
        tailorId: tailor2._id,
        status: 'accepted',
        items: [{ name: 'Брюки', description: 'Ремонт брюк', quantity: 1, price: 4000 }],
        totalPrice: 4000,
      },
      {
        customerId: customer._id,
        tailorId: tailor2._id,
        status: 'done',
        items: [{ name: 'Пальто', description: 'Пальто', quantity: 1, price: 12000 }],
        totalPrice: 12000,
      },
      {
        customerId: customer._id,
        tailorId: null,
        status: 'created',
        items: [{ name: 'Блузка', description: 'Блузка', quantity: 2, price: 2500 }],
        totalPrice: 5000,
      },
      {
        customerId: customer._id,
        tailorId: null,
        status: 'created',
        items: [{ name: 'Костюм', description: 'Костюм', quantity: 1, price: 15000 }],
        totalPrice: 15000,
      },
    ];

    await this.orderModel.insertMany(orders);
    this.logger.log('Successfully seeded test orders.');
  }
}
