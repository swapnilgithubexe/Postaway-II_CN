import express from "express";
import { connectDatabase } from "./config/connectDB.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js"
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json())

server.use("/v1/api/user", userRouter);

server.listen(process.env.PORT, () => {
  console.log("Server is listening on PORT 4100");
  connectDatabase()
})