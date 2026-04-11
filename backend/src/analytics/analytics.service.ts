import { OrdersService } from '@/orders/orders.service';
import { Order } from '@/orders/schemas/order.schema';
import { Injectable } from '@nestjs/common';

import { orderQueryDto } from './dto/order-query.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly ordersService: OrdersService) {}

  async getAnalytics(filter: orderQueryDto): Promise<Order[]> {
    let orders = await this.ordersService.getAllOrders();
    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      orders = orders.filter((order) => new Date(order.createdAt) >= startDate);
    }

    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      orders = orders.filter((order) => new Date(order.createdAt) <= endDate);
    }

    if (filter.tailorId) {
      orders = orders.filter(
        (order) => order.tailorId?.toString() === filter.tailorId,
      );
    }

    if (filter.status) {
      orders = orders.filter((order) => order.status === filter.status);
    }

    return orders;
  }
}
