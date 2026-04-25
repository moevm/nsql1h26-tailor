import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
class OrderItem {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: '' })
  description!: string;

  @Prop({ min: 1, required: true })
  quantity!: number;

  @Prop({ min: 0, required: true })
  price!: number;
}

@Schema()
class OrderComment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true })
  authorId!: mongoose.Types.ObjectId;

  @Prop({ required: true })
  text!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

@Schema()
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  })
  customerId!: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  tailorId?: mongoose.Types.ObjectId;

  @Prop({ type: [OrderItem], required: true })
  items!: OrderItem[];

  @Prop({
    type: String,
    enum: ['created', 'accepted', 'in_progress', 'done', 'cancelled'],
    required: true,
  })
  status!: string;

  @Prop({ type: [OrderComment], default: [] })
  comments!: OrderComment[];

  @Prop({ min: 0, required: true })
  totalPrice!: number;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
