import express from "express";
import { connectDatabase } from "./config/connectDB.js";
import cors from "cors";
import userRouter from "./routes/user.routes.js"
import dotenv from "dotenv";
import postRouter from "./routes/post.routes.js";

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json())

server.use("/v1/api/users", userRouter);
server.use("/v1/api/posts", postRouter);

server.listen(process.env.PORT, () => {
  console.log("Server is listening on PORT 4100");
  connectDatabase()
})