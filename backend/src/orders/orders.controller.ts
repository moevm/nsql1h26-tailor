import { Roles } from '@/common/decorator/roles.decorator';
import { RolesGuard } from '@/common/guards/roles.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'mongoose';

import { Order } from '../database/schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(RolesGuard)
  @Roles(['customer', 'tailor', 'manager'])
  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(RolesGuard)
  @Roles(['customer', 'tailor', 'manager'])
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(['customer'])
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @UseGuards(RolesGuard)
  @Roles(['tailor', 'manager'])
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<UpdateResult> {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @UseGuards(RolesGuard)
  @Roles(['tailor', 'manager'])
  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.ordersService.deleteOrder(id);
  }
}
