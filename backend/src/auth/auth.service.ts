import { User, UserDocument } from '@/database/schemas/user.schema';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

type PublicUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'> & {
  _id: string;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getCurrentUser(email: string): Promise<PublicUser> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return this.toPublicUser(user);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userModel
      .findOne({ email: signInDto.email })
      .exec();
    if (
      !user ||
      !(await bcrypt.compare(signInDto.password, user.password.hash))
    ) {
      throw new UnauthorizedException('Incorrect email or password.');
    }

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    return {
      user: this.toPublicUser(user),
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userModel
      .findOne({ email: signUpDto.email })
      .exec();
    if (user) {
      throw new ConflictException('User with this email already exists.');
    }

    const salt = await bcrypt.genSalt(13);
    const hash = await bcrypt.hash(signUpDto.password, salt);

    const createdUser = new this.userModel({
      name: {
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        patronymic: signUpDto.patronymic ? signUpDto.patronymic : '',
      },
      phone: signUpDto.phone,
      email: signUpDto.email,
      password: {
        hash,
        salt,
      },
      role: 'customer',
    });
    await createdUser.save();

    const payload = {
      sub: createdUser._id.toString(),
      email: createdUser.email,
      role: createdUser.role,
    };

    return {
      user: this.toPublicUser(createdUser),
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  private toPublicUser(user: UserDocument): PublicUser {
    return {
      _id: user._id.toString(),
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };
  }
}
