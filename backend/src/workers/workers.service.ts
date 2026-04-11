import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult } from 'mongoose';

import { User } from '../database/schemas/user.schema';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  getAllWorkers(): Promise<User[]> {
    return this.userModel.find({ role: 'tailor' }).exec();
  }

  async getWorkerById(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById({ _id: id, role: 'tailor' }).exec();
    } catch {
      throw new NotFoundException('Worker not found.');
    }
  }

  createWorker(createWorkerDto: CreateWorkerDto): Promise<User> {
    const createdWorker = new this.userModel(createWorkerDto);
    return createdWorker.save();
  }

  async updateWorker(
    id: string,
    updateWorkerDto: UpdateWorkerDto,
  ): Promise<UpdateResult> {
    try {
      return await this.userModel
        .updateOne({ _id: id, role: 'tailor' }, updateWorkerDto)
        .exec();
    } catch {
      throw new NotFoundException('Worker not found.');
    }
  }

  async deleteWorker(id: string): Promise<DeleteResult> {
    try {
      return await this.userModel.deleteOne({ _id: id, role: 'tailor' }).exec();
    } catch {
      throw new NotFoundException('Worker not found.');
    }
  }
}
