import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);

if (!process.env.DB_CONNECT) {
  process.exit(1);
}

export default mongoose.connect(process.env.DB_CONNECT);
console.log("Connected to the database");
