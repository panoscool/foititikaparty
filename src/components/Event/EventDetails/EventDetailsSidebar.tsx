import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listLabel: {
      color: 'white',
      backgroundColor: '#212121',
      padding: 4,
      borderRadius: 4,
      margin: theme.spacing(0)
    },
    text: {
      color: 'red',
      fontWeight: 'bold'
    }
  })
);

interface DataObject {
  hostedBy: string;
  hostPhotoURL: string;
}

interface Props {
  data: DataObject;
}

function EventDetailsSidebar({ data }: Props) {
  const classes = useStyles();

  return (
    <Paper>
      <div className={classes.listLabel}>
        <Typography variant="h6" align="center">
          People Going
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="avatar" src={data.hostPhotoURL} />
          </ListItemAvatar>
          <ListItemText className={classes.text} primary={data.hostedBy} />
        </ListItem>
      </List>
    </Paper>
  );
}

export default EventDetailsSidebar;
