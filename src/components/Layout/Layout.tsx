import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navigation/Navbar";

// @ts-ignore
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: "tooltip",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
}));

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
