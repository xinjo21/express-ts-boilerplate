import mongoose from "mongoose";

const timeLogSchema = new mongoose.Schema({
  timeCreated: {
    type: Date,
    immutable: true,
    default: Date.now,
    required: true,
  },
  timeUpdated: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const TimeLog = mongoose.model("TimeLog", timeLogSchema);

export default TimeLog;
