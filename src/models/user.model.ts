import mongoose, { Schema } from "mongoose";

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
    created_at: {
      type: Date,
      required: true,
    },
    updated_at: {
      type: Date,
      required: true,
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
