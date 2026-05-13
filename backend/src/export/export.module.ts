import { OrderSchema } from '@/database/schemas/order.schema';
import { UserSchema } from '@/database/schemas/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExportController } from './export.controller';
import { ExportService } from './export.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  providers: [ExportService],
  controllers: [ExportController],
})
export class ExportModule {}
