const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const messageSchema = new Schema({
  speaker: { type: String, enum: ['ai', 'user'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const interviewTranscriptSchema = new Schema({
  stageId: { type: Types.ObjectId, ref: 'InterviewStage', required: true },
  messages: [messageSchema],
});

module.exports = model('InterviewTranscript', interviewTranscriptSchema);
