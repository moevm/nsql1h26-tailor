import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    if ((await this.userModel.countDocuments()) !== 0) {
      return;
    }

    const users = [
      {
        name: {
          firstName: 'customer',
          lastName: 'customer',
          patronymic: 'customer',
        },
        phone: '+71111111111',
        email: 'customer@mail.com',
        password: {
          hash: '$2a$13$imhLgqVT1BymN7HVsxhkI.EIatca9T3YxNDvNjsp0ICR0KQ1AWvuK',
          salt: 'salt',
        },
        role: 'customer',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: {
          firstName: 'tailor',
          lastName: 'tailor',
          patronymic: 'tailor',
        },
        phone: '+72222222222',
        email: 'tailor@mail.com',
        password: {
          hash: '$2a$13$/D2AkhMzUkNjUF5roKeqyOyZJsXnQ3Wxt69iGJzNZBaTKRlUr/IaS',
          salt: 'salt',
        },
        role: 'tailor',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        name: {
          firstName: 'manager',
          lastName: 'manager',
          patronymic: 'manager',
        },
        phone: '+73333333333',
        email: 'manager@mail.com',
        password: {
          hash: '$2a$13$bw25qS0HjLgUBwTAtN1QtewDSVa52fTXBOwBkTrOPAXB/szU3ND8C',
          salt: 'salt',
        },
        role: 'manager',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];
    await this.userModel.insertMany(users);
    console.log('Successfully seeded test users.');
  }
}
