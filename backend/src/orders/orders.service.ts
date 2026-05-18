import { UserPayload } from '@/common/interfaces/user.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult, isValidObjectId } from 'mongoose';

import { Order } from '../database/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { FindOrderDto } from './dto/find-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<Order>,
  ) {}

  getAllOrders(user?: UserPayload['user']): Promise<Order[]> {
    if (!user || user.role !== 'customer') {
      return this.orderModel.find().exec();
    }
    return this.orderModel.find({ customerId: user.sub }).exec();
  }

  async getAllOrdersFiltered(
    findOrderDto: FindOrderDto,
    user: UserPayload['user'],
  ): Promise<Order[]> {
    let orders = await this.getAllOrders(user);
    if (findOrderDto.startDate) {
      const startDate = new Date(findOrderDto.startDate);
      orders = orders.filter((order) => new Date(order.createdAt) >= startDate);
    }

    if (findOrderDto.endDate) {
      const endDate = new Date(findOrderDto.endDate);
      orders = orders.filter((order) => new Date(order.createdAt) <= endDate);
    }

    if (findOrderDto.minPrice) {
      orders = orders.filter(
        (order) => order.totalPrice >= findOrderDto.minPrice!,
      );
    }

    if (findOrderDto.maxPrice) {
      orders = orders.filter(
        (order) => order.totalPrice <= findOrderDto.maxPrice!,
      );
    }

    if (findOrderDto.status) {
      orders = orders.filter((order) => order.status === findOrderDto.status);
    }

    return orders;
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

    const updatePayload = {
      ...updateOrderDto,
      updatedAt: new Date(),
    };

    const order = await this.orderModel
      .updateOne({ _id: id }, updatePayload)
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
