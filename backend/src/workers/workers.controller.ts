import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  findAll() {
    return this.workersService.getAllWorkers();
  }

  @Get(':id') 
  findOne(@Param('id') id: string){
    return this.workersService.getWorkerById(id);
  }

  @Post()
  async create(@Body() createWorkerDto: CreateWorkerDto) {
    return this.workersService.createWorker(createWorkerDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateWorkerDto: UpdateWorkerDto) {
    return this.workersService.updateWorker(id, updateWorkerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.workersService.deleteWorker(id);
  }
}
