import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    const result = await this.orderModel
      .updateOne({ _id: id }, updateOrderDto)
      .exec();
    if (result.matchedCount === 0) {
      throw new NotFoundException('Order not found');
    }
    return result;
  }

  async deleteOrder(id: string): Promise<DeleteResult> {
    const result = await this.orderModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Order not found');
    }
    return result;
  }
}
