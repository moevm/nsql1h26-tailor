import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@/common/interfaces/order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  // посмотреть какие async, а какие - нет
  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Get(':id') 
  async findOne(@Param('id') id: string){
    return this.ordersService.getOrderById(id);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
