import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

// Login Page Component
const LoginPage = () => {
  // Hook to get the theme object from Material UI
  const theme = useTheme();

  // Hook to check if screen size is greater than or equal to 1000px
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        {/* Show the Logo */}
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* Show the message above the email and password */}
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
