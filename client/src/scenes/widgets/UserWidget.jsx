import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// UserWidget component which shows the user profile
const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null); // State to hold user data
  const { palette } = useTheme(); // Get the palette object from Material UI theme
  const navigate = useNavigate(); // Get the navigate object from useNavigate hook
  const token = useSelector((state) => state.token); // Get the token from the redux store
  const dark = palette.neutral.dark; // Get the dark color from the palette
  const medium = palette.neutral.medium; // Get the medium color from the palette
  const main = palette.neutral.main; // Get the main color from the palette

  // Function to fetch user data from the API
  const getUser = async () => {
    // Make a GET request to the API with the userId and authorization header
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Get the response data as JSON
    const data = await response.json();

    // Set the user data in the state
    setUser(data);
  };

  // Use effect hook to call getUser function when the component is mounted
  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  // If the user data is not available yet, return null
  if (!user) {
    return null;
  }

  // Destructure the user data
  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user;

  return (
    <WidgetWrapper>
      {/* First Row */}
      {/* Render the first row with the user image, name and the manage accounts icon */}
      <FlexBetween gap="0.5rem" pb="1.1rem" onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>
      <Divider />

      {/* Second row */}
      {/* Render the location  and the occupation details */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />

      {/* Third Row */}
      {/* Render the details of who viewed the user's profile */}
      {/* Render the details of the impressions the user's profile received */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>
      <Divider />

      {/* Fourth Row */}
      {/* Render the title of the social profiles */}
      {/* Render the Icons */}
      <Box p="1rem">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={main} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
