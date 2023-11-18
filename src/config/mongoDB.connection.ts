import mongoose from "mongoose";
import dotenv from "dotenv";

export default async function MongoDB_Connection(){

  dotenv.config();
  
  mongoose.set("strictQuery", false);
  
  if (!process.env.DB_CONNECT) {
    process.exit(1);
  }
  
  mongoose.connect(process.env.DB_CONNECT); // try with await
  return "Connected to the database";
}

