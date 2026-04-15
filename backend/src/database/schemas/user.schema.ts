import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
class UserName {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({ default: '' })
  patronymic!: string;
}

@Schema()
class UserPassword {
  @Prop({ required: true })
  hash!: string;

  @Prop({ required: true })
  salt!: string;
}

@Schema()
export class User {
  @Prop({ required: true })
  name!: UserName;

  @Prop({ unique: true })
  phone?: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: UserPassword;

  @Prop({
    enum: ['customer', 'tailor', 'manager'],
    required: true,
  })
  role!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
