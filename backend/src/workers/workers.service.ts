import { Injectable } from '@nestjs/common';

import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  async getAllWorkers() {}
  async getWorkerById(id: string) {}
  async createWorker(dto: CreateWorkerDto) {}
  async updateWorker(id: string, dto: UpdateWorkerDto) {}
  async deleteWorker(id: string) {}
}
