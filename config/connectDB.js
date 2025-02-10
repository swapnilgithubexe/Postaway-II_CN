import mongoose from "mongoose";

export const connectDatabase = () => {
  mongoose.connect("mongodb://localhost:27017/postaway");
  console.log("Database connected.");

}