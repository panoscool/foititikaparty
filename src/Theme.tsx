import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme } from '@material-ui/core/styles';
import { teal, amber } from '@material-ui/core/colors';
import Notifier from './Notifier';

export interface Props {
  children: ReactNode;
}

function ThemeWrapper({ children }: Props) {
  const { type } = useSelector((state: any) => state.themeReducer);
  const muiTheme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: amber,
      type: type
    },
    typography: {
      fontFamily: 'Helvetica Neue, sans-serif'
    }
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <SnackbarProvider
        maxSnack={2}
        preventDuplicate
        autoHideDuration={2500}
        disableWindowBlurListener
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Notifier />
        {children}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default ThemeWrapper;
