import { OrderSchema } from '@/database/schemas/order.schema';
import { UserSchema } from '@/database/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImportController } from './import.controller';
import { ImportService } from './import.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  providers: [ImportService],
  controllers: [ImportController],
})
export class ImportModule {}
