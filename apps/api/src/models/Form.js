import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  title: { type: String, required: true }, slug: { type: String, unique: true, lowercase: true, match: /^[a-z0-9-]+$/ },
  description: String, googleFormUrl: String, fields: [{ label: String, name: String, entryId: String, required: Boolean }], active: { type: Boolean, default: true }, submissions: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model('Form', schema);
