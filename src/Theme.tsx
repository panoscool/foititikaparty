import React, { ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import { teal, amber } from '@material-ui/core/colors';
import Notifier from './Notifier';

export interface Props {
  children: ReactNode;
}

function ThemeWrapper({ children }: Props) {
  const muiTheme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: amber,
      type: 'light'
    },
    typography: {
      fontFamily: 'Helvetica Neue, sans-serif'
    }
  });

  return <ThemeProvider theme={muiTheme}>
    <SnackbarProvider autoHideDuration={2500} disableWindowBlurListener maxSnack={2} preventDuplicate anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Notifier />
      {children}
    </SnackbarProvider>
  </ThemeProvider>;
}

export default ThemeWrapper;
