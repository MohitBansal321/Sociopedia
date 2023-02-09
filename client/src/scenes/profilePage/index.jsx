import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  // State to store the user information
  const [user, setUser] = useState(null);

  // Get the userId from the URL parameters
  const { userId } = useParams();

  // Get the JWT token from the Redux store
  const token = useSelector((state) => state.token);

  // Determine if the screen width is over 1000px or not
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  // Function to retrieve the user information from the API
  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  // Use effect hook to get the user information when the component is mounted
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // If the user information is not yet available, return null
  if (!user) return null;

  return (
    <Box>
      {/* Render the Navbar component */}
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* Render the UserWidget component */}
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />

          {/* Render the UserWidget component */}
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* Render the MyPostWidget component */}
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />

          {/* Render the PostsWidget component */}
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
