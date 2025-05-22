const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const uploadSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['resume', 'job_description'], required: true },
  content: { type: String },
  fileUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Upload', uploadSchema);
