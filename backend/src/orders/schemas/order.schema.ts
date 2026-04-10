import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    quantity: { type: Number, min: 1 },
    price: { type: Number, min: 0, required: true },
  },
  {
    _id: false,
  },
);

const OrderCommentSchema = new mongoose.Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    _id: false,
  },
);

export const OrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tailorId: { type: mongoose.Schema.Types.ObjectId, default: null },
  items: { type: [OrderItemSchema], required: true },
  status: {
    type: String,
    enum: ['created', 'accepted', 'in_progress', 'done', 'cancelled'],
    required: true,
  },
  comments: { type: [OrderCommentSchema], default: [] },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
