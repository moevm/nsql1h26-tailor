import { Document } from 'mongoose';

export enum OrderStatus {
  created = 'created',
  accepted = 'accepted',
  in_progress = 'in_progress',
  done = 'done',
  cancelled = 'cancelled',
}

export interface OrderItem {
  name: string;
  description?: string;
  quantity?: number;
  price: number;
}

export interface OrderComment {
  authorId: string;
  text: string;
  createdAt?: Date;
}

export interface Order extends Document {
  customerId: string;
  tailorId?: string;
  items: OrderItem[];
  status: OrderStatus;
  comments?: OrderComment[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
