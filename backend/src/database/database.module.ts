import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: OrderSchema }])],
  providers: [DatabaseService],
})
export class DatabaseModule {}
