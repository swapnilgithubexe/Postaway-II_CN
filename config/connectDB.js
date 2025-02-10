import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI);
  console.log("Database connected.");

}