import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: { type: String, trim: true, minlength: 2, maxlength: 60 },
  email: { type: String, lowercase: true, trim: true, unique: true, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });
export default mongoose.model('User', schema);
