// @ts-nocheck
import React from 'react';
import format from 'date-fns/format';
import { useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AccessTime from '@material-ui/icons/AccessTime';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import { objectToArray } from '../../utils/helpers';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1, 0)
    },
    avatar: {
      width: 60,
      height: 60
    },
    icon: {
      verticalAlign: 'text-bottom'
    },
    infoBlock: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    cancelledText: {
      color: 'white',
      background: 'red',
      borderRadius: 5,
      padding: theme.spacing(0, 0.5)
    }
  })
);

interface Props {
  doc: any
}

function EventList({ doc }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const attendees = objectToArray(doc.attendees);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              className={classes.avatar}
              alt="avatar"
              src={doc.hostPhotoURL}
            />
          }
          title={doc.title}
          subheader={`Hosted by: ${doc.hostedBy}`}
          onClick={() => history.push(`/event/${doc.id}`)}
        />
      </CardActionArea>
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="body2" color="textPrimary">
          <AccessTime className={classes.icon} />{' '}
          {format(doc.date.toDate(), 'do MMM yyyy')}{' '}
          {format(doc.date.toDate(), 'h:mm a')}{' '}
          <RoomOutlined className={classes.icon} /> {doc.venue}
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary">
          {doc.description}
        </Typography>
        <div className={classes.infoBlock}>
          <Typography variant='caption' color="textSecondary">Attendees: {attendees.length}</Typography>
          {doc.cancelled && <Typography variant='caption' className={classes.cancelledText}>This event has been cancelled</Typography>}
        </div>
      </CardContent>
    </Card>
  );
}

export default EventList;
