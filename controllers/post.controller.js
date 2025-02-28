import postModel from "../model/postSchema.js";
import userModel from "../model/userSchema.js";

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
      message: "Posts retreived successfully",
      posts: posts
    })
  } catch (error) {
    console.log("Error in the get all post controller function");

    res.status(500).json({ message: "Internal Server Error" });

  }
}

//new post
export const createPost = async (req, res) => {
  try {
    const { caption, imageUrl } = req.body;
    const user = req.user._id

    const newPost = new postModel({ userId: user, caption: caption, imageUrl: imageUrl });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      newPost
    })

  } catch (error) {
    console.log("Error in the create post controller function");
    res.status(500).json({ message: "Internal Server Error", error: error.message });

  }
}

//get single posts
export const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({
        message: `No post found with id${id}`
      })
    }
    res.status(200).json({
      message: "Post fetched successfully",
      post: post
    })

  } catch (error) {
    console.log("Error in the get single post controller function");

    res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}

//update a post (caption Only)
export const updatePost = async (req, res) => {
  try {
    const { newCaption } = req.body;
    const { id } = req.params;

    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({
        message: `No post found with id${id}`
      })
    }

    //we can also user findByIdAndUpdate 
    //But I chose this way
    post.caption = newCaption;
    await post.save()

    res.status(200).json({
      message: "Post updated successfully",
      post: post
    })
  } catch (error) {
    console.log("Error in the update post controller function");

    res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}

//delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({
        message: `No post found with id${id}`
      });
    }

    res.status(200).json({
      message: "Post deleted successfully"
    })

  } catch (error) {
    console.log("Error in the delete post controller function");

    res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}
