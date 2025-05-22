const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const interviewStageSchema = new Schema({
  interviewAttemptId: { type: Types.ObjectId, ref: 'InterviewAttempt', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: {type: String},
  order: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'completed', 'failed'], 
    default: 'pending' 
  },
  config: {
    timeLimit: { type: Number, default: 30 },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('InterviewStage', interviewStageSchema);