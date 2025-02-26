import postModel from "../model/postSchema.js";

//get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find({});
    if (!posts) {
      return res.status(404).json({
        message: "No post found"
      })
    }
    res.status(200).json({
      message: "Posts retreived successfully"
    }, posts)
  } catch (error) {
    console.log("Error in the get all post controller function");

    res.status(500).json({ message: "Internal Server Error" });

  }
}

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
    console.log("Error in the create post controller function");
    res.status(500).json({ message: "Internal Server Error" });

  }
}

