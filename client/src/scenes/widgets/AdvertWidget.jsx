import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

// AdvertWidget is a functional component that displays a sponsored advertisement
const AdvertWidget = () => {
  // Accessing the material-ui theme object to extract specific colors
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // Render the widget and its contents
  return (
    <WidgetWrapper>
      {/* The header section with two text components */}
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>

      {/* The main image */}
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${process.env.REACT_APP_BASE_URL}/assets/info4.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />

      {/* The bottom section with two text components */}
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </FlexBetween>

      {/* The description */}
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin
        and shining like light.
      </Typography>
    </WidgetWrapper>
  );
};
export default AdvertWidget;
