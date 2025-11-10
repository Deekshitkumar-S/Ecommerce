import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';

export type UserDocument = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
};

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user', index: true }
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(env.bcryptRounds);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = models.User || model<UserDocument>('User', userSchema);

