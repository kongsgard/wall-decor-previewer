import { extendTheme } from "@chakra-ui/react";

const overrides = {
  colors: {
    primary: "#bba677",
    secondary: "#bba677",
    hover: "#bba677",
    pressed: "#bba677",
    info: "#2BB2FF",
    warning: "#FFC633",
    success: "#06C270",
    error: "#FF3B3B",
    gray: {
      50: "#FAFAFA",
      100: "#F2F2F5",
      200: "#EBEBF0",
      300: "#E4E4EB",
      350: "#C5C5C5",
      600: "#424465",
      700: "#28293D",
      800: "#23242A",
      900: "#121219",
    },
  },
};

export default extendTheme(overrides);
