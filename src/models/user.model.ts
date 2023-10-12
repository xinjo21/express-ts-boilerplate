import mongoose, { Schema } from "mongoose";
import TimeLog from "./timelog.model";

const StringRequired = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema({
  name: {
    lastName: {
      ...StringRequired,
      max: 255,
    },
    firstName: {
      ...StringRequired,
      max: 255,
    },
    middleName: {
      type: String,
      max: 255,
    },
  },
  email: {
    ...StringRequired,
    min: 6,
    lowercase: true,
  },
  password: {
    ...StringRequired,
    min: 6,
    max: 1024,
  },
  timelog: {
    type: Schema.Types.ObjectId,
    ref: "TimeLog",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
