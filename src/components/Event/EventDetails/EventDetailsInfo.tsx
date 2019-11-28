import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { format, parseISO } from 'date-fns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(2, 0, 2, 2),
      [theme.breakpoints.down('md')]: {
        margin: theme.spacing(2)
      }
    },
    button: {
      margin: theme.spacing(0, 1, 1, 1)
    },
    btnPosition: {
      textAlign: 'right'
    }
  })
);

interface DataObject {
  description: string;
  date: string;
}

interface Props {
  data: DataObject;
}

function EventDetailsInfo({ data }: Props) {
  const classes = useStyles();

  const formatedDate = format(parseISO(data.date), 'dd MMMM yyyy');

  return (
    <Paper className={classes.paper}>
      <List>
        <ListItem divider>
          <ListItemIcon>
            <CalendarTodayOutlined color="primary" />
          </ListItemIcon>
          <ListItemText primary={formatedDate} />
        </ListItem>
        <ListItem divider>
          <ListItemIcon>
            <InfoOutlined color="primary" />
          </ListItemIcon>
          <ListItemText primary={data.description} />
        </ListItem>
      </List>
      <div className={classes.btnPosition}>
        <Button
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Join this event
        </Button>
      </div>
    </Paper>
  );
}

export default EventDetailsInfo;
