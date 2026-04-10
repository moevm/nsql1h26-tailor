import { OrdersModule } from '@/orders/orders.module';
import { Module } from '@nestjs/common';

import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [OrdersModule],
  controllers: [AnalyticsController],
})
export class AnalyticsModule {}
