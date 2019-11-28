import React, { ReactNode } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Navbar from './Navigation/Navbar';

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
      backgroundColor: theme.palette.background.default
    }
  })
);

export interface Props {
  children: ReactNode;
}

function Layout(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default Layout;
