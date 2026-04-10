import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderHistoryDocument = HydratedDocument<OrderHistory>;

@Schema()
export class OrderHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  orderId: mongoose.Types.ObjectId;

  @Prop({
    enum: ['created', 'accepted', 'in_progress', 'done', 'cancelled'],
    required: true,
  })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  changedBy: mongoose.Types.ObjectId;

  @Prop({ default: '' })
  comment: string;

  @Prop({ default: Date.now })
  changedAt: Date;
}

export const OrderHistorySchema = SchemaFactory.createForClass(OrderHistory);
