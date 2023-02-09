import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

// PostsWidget component that retrieves posts from the API and renders each post using the PostWidget component
const PostsWidget = ({ userId, isProfile = false }) => {
  // Get the dispatch method from the React Redux hook
  const dispatch = useDispatch();

  // Get the posts and token from the state using the React Redux hook
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // Function to get all posts from the API
  const getPosts = async () => {
    // Fetch the posts from the API
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Parse the response as JSON
    const data = await response.json();

    // Dispatch an action to update the posts in the state
    dispatch(setPosts({ posts: data }));
  };

  // Function to get all posts for a specific user from the API
  const getUserPosts = async () => {
    // Fetch the user's posts from the API
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Parse the response as JSON
    const data = await response.json();

    // Dispatch an action to update the posts in the state
    dispatch(setPosts({ posts: data }));
  };

  // Dispatch an action to update the posts in the state
  useEffect(() => {
    // Dispatch an action to update the posts in the state
    if (isProfile) {
      getUserPosts();
    } else {
      // Otherwise, get all posts
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Otherwise, get all posts
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => {
          return (
            <PostWidget
              key={_id} // unique key for each post
              postId={_id} // ID of the post
              postUserId={userId} // ID of the user who created the post
              name={`${firstName} ${lastName}`} // name of the user who created the post
              description={description} // description of the post
              location={location} // location of the user who created the post
              picturePath={picturePath} // path to the picture associated with the post
              userPicturePath={userPicturePath} // path to the picture of the user who created the post
              likes={likes} // likes for the post
              comments={comments} // comments for the post
            />
          );
        }
      )}
    </>
  );
};
export default PostsWidget;
