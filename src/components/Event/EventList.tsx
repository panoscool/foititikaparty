import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Divider, CardActionArea } from '@material-ui/core';
import AccessTime from '@material-ui/icons/AccessTime';
import RoomOutlined from '@material-ui/icons/RoomOutlined';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2)
    },
    avatar: {
      width: 60,
      height: 60
    },
    icon: {
      verticalAlign: 'text-bottom'
    }
  })
);

function EventList(props: any) {
  const classes = useStyles();
  let history = useHistory();

  const { id, title, description, hostedBy, date, venue, hostPhotoURL } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              alt="avatar"
              src={hostPhotoURL}
            />
          }
          title={title}
          subheader={hostedBy}
          onClick={() => history.push(`/event/${id}`)}
        />
      </CardActionArea>
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="body2" color="textPrimary">
          <AccessTime className={classes.icon} /> {date}{' '}
          <RoomOutlined className={classes.icon} /> {venue}
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Attendees: 10
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventList;
