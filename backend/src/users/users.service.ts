import { User } from '@/database/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateResult } from 'mongoose';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async updateCurrentUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const user = await this.userModel
      .updateOne({ _id: userId }, updateUserDto)
      .exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
