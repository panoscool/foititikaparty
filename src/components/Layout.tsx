// @ts-nocheck
import React, { ReactNode } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Navbar from './Navigation/Navbar';
import NavigationBottom from './Navigation/NavigationBottom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'flex',
      overflow: 'hidden'
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('md')]: {
        paddingBottom: theme.spacing(6)
      }
    }
  })
);

export interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      <NavigationBottom />
    </div>
  );
}

export default Layout;
