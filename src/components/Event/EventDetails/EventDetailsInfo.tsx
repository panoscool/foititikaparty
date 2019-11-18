import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Page } from '../../Layout/Page';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

function EventDetailsInfo() {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.root}>
        <List>
          <ListItem divider>
            <ListItemIcon>
              <InfoOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="Brunch this weekend." />
          </ListItem>
          <ListItem divider>
            <ListItemIcon>
              <CalendarTodayOutlined color="primary" />
            </ListItemIcon>
            <ListItemText primary="20 Nov 2019 at 7:00 pm" />
          </ListItem>
        </List>
        <Button color="secondary" variant="contained">
          Join this event
        </Button>
      </div>
    </Page>
  );
}

export default EventDetailsInfo;
