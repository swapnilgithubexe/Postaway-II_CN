import express from "express";
import { createPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.js";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getOnePost);
postRouter.put("/:id/update", updatePost);
postRouter.post("/", auth, createPost);
postRouter.delete("/:id", deletePost);



export default postRouter;