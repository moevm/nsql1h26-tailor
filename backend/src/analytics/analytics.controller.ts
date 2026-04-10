import { OrdersService } from '@/orders/orders.service';
import { Controller, Get } from '@nestjs/common';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.getAllOrders();
  }
}
