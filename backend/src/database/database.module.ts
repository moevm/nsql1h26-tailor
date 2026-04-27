import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseService } from './database.service';
import { OrderSchema } from './schemas/order.schema';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
