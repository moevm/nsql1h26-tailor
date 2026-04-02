import { Controller, Get } from '@nestjs/common';
import { OrdersService } from '@/orders/orders.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.getAllOrders();
  }
}
