import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { env } from './env.js';
import User from '../models/User.js';

async function provisionInitialAdmin() {
  if (!env.adminEmail || !env.adminPassword) return;
  if (env.adminPassword.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters.');
  const existing = await User.findOne({ email: env.adminEmail }).select('+password');
  if (existing) {
    if (existing.role !== 'admin') { existing.role = 'admin'; await existing.save(); }
    return;
  }
  await User.create({ name: 'Shefin Franklin', email: env.adminEmail, password: await bcrypt.hash(env.adminPassword, 12), role: 'admin' });
  console.info(`Initial admin provisioned for ${env.adminEmail}`);
}

export async function connectDatabase() {
  if (!env.mongoUri) throw new Error('MONGODB_URI must be configured.');
  await mongoose.connect(env.mongoUri);
  await provisionInitialAdmin();
  console.info('MongoDB connected');
}
