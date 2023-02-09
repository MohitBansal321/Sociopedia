import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

// Home Page
const HomePage = () => {
  // Hook to check if screen size is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      {/* NavBar */}
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* User Widget Left Side */}
        <Box flexBasis={isNonMobileScreens ? "26%" : "undefined"}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        {/* Create Post && Get Posts Center  */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : "undefined"}
          mt={isNonMobileScreens ? "undefined" : "2rem"}
        >
          {/* Create Post */}
          <MyPostWidget picturePath={picturePath} />

          {/* Get Post */}
          <PostsWidget userId={_id} />
        </Box>

        {/* AdWidget && FriendListWidget Right Side  */}
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default HomePage;
