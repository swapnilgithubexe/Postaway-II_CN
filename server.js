import express from "express";
import { connectDatabase } from "./config/connectDB.js";

const server = express();

server.listen(4100, () => {
  console.log("Server is listening on PORT 4100");
  connectDatabase()
})