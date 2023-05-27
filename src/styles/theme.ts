import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Dosis",
    body: "Dosis",
  },
  styles: {
    global: {
      body: {
        bg: "gray.200",
      },
    },
  },
});
