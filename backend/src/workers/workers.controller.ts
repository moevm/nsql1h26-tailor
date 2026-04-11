import { User } from '@/database/schemas/user.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'mongoose';

import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { WorkersService } from './workers.service';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.workersService.getAllWorkers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.workersService.getWorkerById(id);
  }

  @Post()
  create(@Body() createWorkerDto: CreateWorkerDto): Promise<User> {
    return this.workersService.createWorker(createWorkerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ): Promise<UpdateResult> {
    return this.workersService.updateWorker(id, updateWorkerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.workersService.deleteWorker(id);
  }
}
