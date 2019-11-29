import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Divider, CardActionArea } from '@material-ui/core';
import AccessTime from '@material-ui/icons/AccessTime';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginBottom: theme.spacing(2)
    },
    avatar: {
      width: 60,
      height: 60,
    },
  }),
);

function EventList(props: any) {
  const classes = useStyles();

  const { title, description, hostedBy, date, attendees, hostPhotoURL } = props

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar className={classes.avatar} alt="avatar" src={hostPhotoURL} />}
          title={title}
          subheader={hostedBy}
        />
      </CardActionArea>
      <Divider />
      <CardContent>
        <AccessTime /> {date}
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
          {attendees.length}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default EventList;
