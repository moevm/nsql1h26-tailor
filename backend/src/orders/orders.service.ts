import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult, isValidObjectId } from 'mongoose';

import { Order } from '../database/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid order ID format.');
    }

    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Order not found.');
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
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid order ID format.');
    }

    const order = await this.orderModel
      .updateOne({ _id: id }, updateOrderDto)
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return order;
  }

  async deleteOrder(id: string): Promise<DeleteResult> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid order ID format.');
    }

    const order = await this.orderModel.deleteOne({ _id: id }).exec();
    if (!order) {
      throw new NotFoundException('Order not found.');
    }
    return order;
  }
}
