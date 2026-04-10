import mongoose from 'mongoose';

const UserNameSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    patronymic: { type: String, default: '' },
  },
  {
    _id: false,
  },
);

const UserPasswordSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  {
    _id: false,
  },
);

export const UserSchema = new mongoose.Schema({
  name: { type: UserNameSchema, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: UserPasswordSchema, required: true },
  role: { type: String, enum: ['customer', 'tailor'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
