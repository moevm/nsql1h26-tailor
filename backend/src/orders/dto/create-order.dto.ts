import { Type } from 'class-transformer';
import {
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class OrderItem {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsNotEmpty()
  @IsNumber()
  price!: number;
}

class OrderComment {
  @IsMongoId()
  @IsNotEmpty()
  authorId!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;
}

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  customerId!: string;

  @IsMongoId()
  @IsOptional()
  tailorId?: string;

  @IsNotEmpty()
  @Type(() => OrderItem)
  items!: OrderItem[];

  @IsNotEmpty()
  @IsString()
  status!: string;

  @IsNotEmpty()
  @Type(() => OrderComment)
  comments!: OrderComment[];

  @IsNotEmpty()
  @IsNumber()
  totalPrice!: number;

  @IsDate()
  @IsNotEmpty()
  createdAt!: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt!: Date;
}
