// @ts-nocheck
import React, { useState, createContext, ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { teal, amber } from '@material-ui/core/colors';

export interface Props {
  children: ReactNode;
}

export const ThemeContext = createContext({
  theme: 'light',
  modal: null,
  setTheme: () => { },
  handleModal: () => { },
});

function ThemeWrapper({ children }: Props) {
  const [modal, setModal] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem('anyvent_theme') || 'light'
  );

  const handleModal = (modalType: any) => {
    setModal(modalType)
  }

  const muiTheme = createMuiTheme({
    palette: {
      primary: teal,
      secondary: amber,
      type: theme
    },
    typography: {
      fontFamily: 'Helvetica Neue, sans-serif'
    }
  });

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
        modal: modal,
        handleModal: handleModal,
      }}
    >
      <ThemeProvider theme={muiTheme}>
        <SnackbarProvider
          maxSnack={2}
          preventDuplicate
          autoHideDuration={2500}
          disableWindowBlurListener
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeWrapper;
