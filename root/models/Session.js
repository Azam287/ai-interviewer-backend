const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const sessionSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },

  sessionId: {
    type: String,
    required: true,
    unique: true
  },

  ipAddress: String,

  userAgent: String,

  isValid: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  lastUsedAt: {
    type: Date,
    default: Date.now
  },

  expiresAt: {
    type: Date,
    required: true
  }
});

module.exports = model('Session', sessionSchema);
