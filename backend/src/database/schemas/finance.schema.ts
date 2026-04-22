import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FinanceDocument = HydratedDocument<Finance>;

@Schema()
export class Finance {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  orderId!: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  authorId?: mongoose.Types.ObjectId;

  @Prop({ enum: ['income', 'expense'], required: true })
  type!: string;

  @Prop({ required: true })
  amount!: number;

  @Prop({ default: '' })
  description!: string;

  @Prop({ default: Date.now })
  createdAt!: Date;
}

export const FinanceSchema = SchemaFactory.createForClass(Finance);
