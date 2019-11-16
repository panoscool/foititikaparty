import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navigation/Navbar";

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
    backgroundColor: theme.palette.background.default,
    padding: `theme.spacing(y) * 3`
  }
}));

function Layout(props) {
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
