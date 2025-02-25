import postModel from "../model/postSchema.js";

//new post
export const createPost = async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;
    const newPost = new postModel({ caption: caption, imageUrl: imageUrl });
    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      newPost
    })

  } catch (error) {
    console.log(error);
  }
}