import express from "express";
import { getAllDetails, getUserDetails, login, logout, registerUser, updateUserDetails } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/signin", login);
userRouter.post("/logout", logout);
userRouter.get("/get-details/:userId", auth, getUserDetails);
userRouter.get("/get-all-details", auth, getAllDetails)
userRouter.post("/update-details/:userId", auth, updateUserDetails);
export default userRouter;