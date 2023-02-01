import mongoose from "mongoose";

// Define the Post Schema
const postSchema = mongoose.Schema(
  {
    // ID of the user who created the post
    userId: {
      type: String,
      required: true,
    },

    // First name of the user who created the post
    firstName: {
      type: String,
      required: true,
    },

    // Last name of the user who created the post
    lastName: {
      type: String,
      required: true,
    },

    // Location associated with the post
    location: String,

    // Description of the post
    description: String,

    // Path to the picture for the post
    picturePath: String,

    // Path to the picture for the user who created the post
    userPicturePath: String,

    // Map of likes for the post, key is user ID and value is boolean indicating like or not
    likes: {
      type: Map,
      of: Boolean,
    },

    // Array of comments for the post
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // include timestamps for creation and update dates
);

// Compile the schema into a model
const Post = mongoose.model("Post", postSchema);

// Export the model
export default Post;
