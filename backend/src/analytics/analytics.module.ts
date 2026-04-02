import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { OrdersModule } from '@/orders/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
