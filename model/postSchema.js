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
  imageUrl: [{
    type: [String, "Image URL is required for a post"]
  }]
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;