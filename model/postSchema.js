import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "UserID is required"]
  },
  caption: {
    type: String
  },
  imageUrl: {
    type: [String],
    required: [true, "At least one image URL is required"]
  }
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;