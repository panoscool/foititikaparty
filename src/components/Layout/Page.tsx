import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  pageInner: {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
    color: theme.palette.text.secondary
  }
}));

interface Props {
  children: ReactNode;
}

export function Page(props: Props) {
  const classes = useStyles();

  return <Paper className={classes.paper}>{props.children}</Paper>;
}

export function PageInner(props: Props) {
  const classes = useStyles();

  return <Paper className={classes.pageInner}>{props.children}</Paper>;
}
