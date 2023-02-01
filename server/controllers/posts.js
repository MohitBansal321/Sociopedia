import Post from "../models/Post.js";
import User from "../models/User.js";

// create post for user
export const createPost = async (req, res) => {
  try {
    // Get values from the request body
    const { userId, description, picturePath } = req.body;

    // Find the user by the provided userId
    const user = await User.findById(userId);

    // Create a new post with the user's information and post information
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    // Get all posts and return them in the response
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// Get Feed Post of all User
export const getFeedPosts = async (req, res) => {
  try {
    // Get all posts from the database
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Get User's Posts
export const getUserPosts = async (req, res) => {
  try {
    // Get the userId from the URL parameters
    const { userId } = req.params;

    // Get all posts by the user from the database
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update post to like/unlike a post
export const likePost = async (req, res) => {
  try {
    // Get the post id from the URL parameters
    const { id } = req.params;

    // Get the userId from the request body
    const { userId } = req.body;

    // Find the post by the provided id
    const post = await Post.findById(id);

    // Check if the post has been liked by the user
    const isLiked = post.likes.get(userId);

    // If the post has been liked, unlike it
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      // If the post has not been liked, like it
      post.likes.set(userId, true);
    }
    // update the Post
    const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
