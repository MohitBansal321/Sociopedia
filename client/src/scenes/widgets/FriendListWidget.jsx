import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  // useDispatch allows access to the dispatch method from the Redux store
  const dispatch = useDispatch();

  // useTheme allows access to the current theme's information (palette, typography, etc.)
  const { palette } = useTheme();

  // useSelector allows access to information stored in the Redux store
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // Async function to get the list of friends of the specified user
  const getFriends = async () => {
    // Make a GET request to the API to retrieve the friends of the specified user
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    // Convert the response to JSON
    const data = await response.json();

    // Dispatch an action to update the friends in the Redux store
    dispatch(setFriends({ friends: data }));
  };

  // Use Effect hook to call the `getFriends` function when the component is mounted
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // Wrap the component in the WidgetWrapper component to provide a consistent style
    <WidgetWrapper>
      {/* Display the title of the widget */}
      <Typography color={palette.neutral.dark} variant="h5" fontWeight="500" sx={{ mb: "1.5rem" }}>
        Friend List
      </Typography>

      {/* Wrap the friends in a box with a flex display and column direction, and add a gap between each friend component */}
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {/* Map through the friends in the Redux store and display a Friend component for each one */}
        {friends.map((friend) => (
          <Friend
            key={friend._id} // unique identifier for each friend component
            friendId={friend._id} // the id of the friend
            name={`${friend.firstName} ${friend.lastName}`} // the full name of the friend
            subtitle={friend.occupation} // the occupation of the friend
            userPicturePath={friend.picturePath} // the path to the picture of the friend
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
