import mongoose from 'mongoose';

export const OrderHistorySchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    enum: ['created', 'accepted', 'in_progress', 'done', 'cancelled'],
    required: true,
  },
  changedBy: { type: mongoose.Schema.Types.ObjectId, default: null },
  comment: { type: String, default: '' },
  changedAt: { type: Date, default: Date.now },
});
