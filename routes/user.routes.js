import express from "express";
import { login, registerUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/signin", login);
export default userRouter;