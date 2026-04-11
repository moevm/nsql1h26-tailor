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

  async getOrderById(id: string): Promise<Order | null> {
    try {
      return await this.orderModel.findById(id).exec();
    } catch {
      throw new NotFoundException('Order not found.');
    }
  }

  createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    try {
      return await this.orderModel
        .updateOne({ _id: id }, updateOrderDto)
        .exec();
    } catch {
      throw new NotFoundException('Order not found.');
    }
  }

  async deleteOrder(id: string): Promise<DeleteResult> {
    try {
      return await this.orderModel.deleteOne({ _id: id }).exec();
    } catch {
      throw new NotFoundException('Order not found.');
    }
  }
}
