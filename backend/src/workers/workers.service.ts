import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, UpdateResult, isValidObjectId } from 'mongoose';

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

  async getWorkerById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid worker ID format.');
    }

    const worker = await this.userModel
      .findById({ _id: id, role: 'tailor' })
      .exec();
    if (!worker) {
      throw new NotFoundException('Worker not found.');
    }
    return worker;
  }

  async createWorker(createWorkerDto: CreateWorkerDto): Promise<User> {
    try {
      const createdWorker = new this.userModel(createWorkerDto);
      return await createdWorker.save();
    } catch {
      throw new ConflictException(
        'Failed to create worker: phone or email already exists.',
      );
    }
  }

  async updateWorker(
    id: string,
    updateWorkerDto: UpdateWorkerDto,
  ): Promise<UpdateResult> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid worker ID format.');
    }

    const worker = await this.userModel
      .updateOne({ _id: id, role: 'tailor' }, updateWorkerDto)
      .exec();
    if (!worker) {
      throw new NotFoundException('Worker not found.');
    }
    return worker;
  }

  async deleteWorker(id: string): Promise<DeleteResult> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid worker ID format.');
    }

    const worker = await this.userModel
      .deleteOne({ _id: id, role: 'tailor' })
      .exec();
    if (!worker) {
      throw new NotFoundException('Worker not found.');
    }
    return worker;
  }
}
