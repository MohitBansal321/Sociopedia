import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // Function for creating new Post
  const handlePost = async () => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the user ID and post description to the form data
    formData.append("userId", _id);
    formData.append("description", post);

    // If an image is selected, append it to the form data
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    // Make a POST request to the server with the form data
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    // Get the updated list of posts from the server
    const posts = await response.json();

    // Dispatch an action to update the posts in the Redux store
    dispatch(setPosts({ posts }));

    // Reset the image and post
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      {/* Display the user image and post input */}
      <FlexBetween gap="1.5rem">
        {/* User image component */}
        <UserImage image={picturePath} />

        {/* Input for post text */}
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* Show the image section if isImage is true */}
      {isImage && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          {/* Dropzone component to add image */}
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                {/* Box to display the add image text or selected image name */}
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>

                {/* Delete button to remove image */}
                {image && (
                  <IconButton onClick={() => setImage(null)} sx={{ width: "15%" }}>
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* Display various options and post button */}
      <FlexBetween>
        {/* Option to add image */}
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography color={mediumMain} sx={{ "&:hover": { cursor: "pointer", color: medium } }}>
            Image
          </Typography>
        </FlexBetween>

        {/* Options for non-mobile screens */}
        {isNonMobileScreens ? (
          <>
            {/* Option to add clip To-Do */}
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            {/* Option to add attachment */}
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            {/* Option to add audio To-Do */}
            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}
        {/* Button for Post  */}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
