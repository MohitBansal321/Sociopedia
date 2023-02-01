import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

// Create a new express router instance
const router = express.Router();

// Route to get all the posts in the feed
// Requests to this route must have a valid JWT token
// The request is handled by the `getFeedPosts` function from the `posts` controller
router.get("/", verifyToken, getFeedPosts);

// Route to get all the posts of a specific user
// Requests to this route must have a valid JWT token
// The request is handled by the `getUserPosts` function from the `posts` controller
router.get("/:userId/posts", verifyToken, getUserPosts);

// Route to handle like/unlike of a post
// Requests to this route must have a valid JWT token
// The request is handled by the `likePost` function from the `posts` controller
router.patch("/:id/like", verifyToken, likePost);

// Export the router instance
export default router;
