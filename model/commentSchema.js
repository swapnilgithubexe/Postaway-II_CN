import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is required"]
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "PostId is required"]
  },
  content: {
    type: String,
    required: [true, "Some text for the comment is required"],
    minLength: [0, "Minimum 1 character for a comment"]
  }
});

const commentModel = mongoose.model("Comment", commentSchema);
export default commentModel;