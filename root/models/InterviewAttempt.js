const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const interviewAttemptSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  cvUploadId: { type: Types.ObjectId, ref: "Upload", required: true },
  jobDescriptionId: { type: Types.ObjectId, ref: "Upload", required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "failed"],
    default: "pending",
  },
  startedAt: { type: Date },
  endedAt: { type: Date },
  feedback: { type: String },
  resultSummary: {
    score: { type: Number },
    tags: [{ type: String }],
  },
});

module.exports = model("InterviewAttempt", interviewAttemptSchema);
