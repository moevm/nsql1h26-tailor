import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  async getAllOrders() {}
  async getOrderById(id: string) {}
  async createOrder(dto: CreateOrderDto) {}
  async updateOrder(id: string, dto: UpdateOrderDto) {}
  async deleteOrder(id: string) {}
}
