import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2, 3),
    color: theme.palette.text.secondary
  }
}));

function PaperPage(props) {
  const classes = useStyles();

  return <Paper className={classes.paper}>{props.children}</Paper>;
}

export default PaperPage;
