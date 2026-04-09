import { Inject, Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from '@/common/interfaces/order.interface';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('ORDER_MODEL')
    private readonly orderModel: Model<Order>,
  ) {}

  // непонятно когда exec прокидывать и добавить try/catch

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }
  async getOrderById(id: string) {
    return this.orderModel.findById(id);
  }
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }
  async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = new this.orderModel(updateOrderDto);
    return updatedOrder.updateOne();
  }
  async deleteOrder(id: string) {
    this.orderModel.deleteOne({id});
  }
}
