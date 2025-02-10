import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"]
  }],
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "PostId is required"]
  }
});

const likeModel = mongoose.model("Like", likeSchema);
export default likeModel;