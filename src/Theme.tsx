import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { teal, amber } from "@material-ui/core/colors";

function ThemeWrapper({ children }) {

  const muiTheme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: amber,
      type: 'light'
    },
    typography: {
      fontFamily: "Helvetica Neue, sans-serif"
    }
  });

  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;
