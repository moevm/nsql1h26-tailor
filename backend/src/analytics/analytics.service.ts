import { Order } from '@/database/schemas/order.schema';
import { OrdersService } from '@/orders/orders.service';
import { Injectable } from '@nestjs/common';

import { OrderQueryDto } from './dto/order-query.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly ordersService: OrdersService) {}

  async getAnalytics(orderQueryDto: OrderQueryDto): Promise<Order[]> {
    let orders = await this.ordersService.getAllOrders();
    if (orderQueryDto.startDate) {
      const startDate = new Date(orderQueryDto.startDate);
      orders = orders.filter((order) => new Date(order.createdAt) >= startDate);
    }

    if (orderQueryDto.endDate) {
      const endDate = new Date(orderQueryDto.endDate);
      orders = orders.filter((order) => new Date(order.createdAt) <= endDate);
    }

    if (orderQueryDto.tailorId) {
      orders = orders.filter(
        (order) => order.tailorId?.toString() === orderQueryDto.tailorId,
      );
    }

    if (orderQueryDto.status) {
      orders = orders.filter((order) => order.status === orderQueryDto.status);
    }

    return orders;
  }
}
