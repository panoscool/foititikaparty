import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVert from '@material-ui/icons/MoreVert';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RoomOutlined from '@material-ui/icons/RoomOutlined';
import GoogleMap from '../../Shared/GoogleMap';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    icon: {
      margin: theme.spacing(1)
    }
  })
);

interface DataObject {
  title: string;
  description: string;
  venue: string;
  category: string;
  hostedBy: string;
  hostPhotoURL: string;
  venueLatLng: any
}

interface Props {
  data: DataObject;
  isHost: boolean;
  cancelled: boolean;
  handleDelete: (e: any) => void;
  cancelToggle: (e: any) => void;
}

function EventDetailsHeader({ data, isHost, cancelled, handleDelete, cancelToggle }: Props) {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar alt="avatar" src={data.hostPhotoURL} />}
        action={
          isHost &&
          <IconButton aria-label="settings" aria-haspopup="true" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
        title={data.title}
        subheader={data.hostedBy}
      />
      <Menu
        id="settings"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => history.push(`/event/edit/${id}`)}>Edit event</MenuItem>
        <MenuItem onClick={handleDelete}>Delete event</MenuItem>
        <MenuItem onClick={cancelToggle}>{cancelled ? 'Reactivate event' : 'Cancel Event'}</MenuItem>
      </Menu>
      <CardMedia className={classes.media} image={`/assets/categories/${data.category}.jpg`} />
      <CardActions disableSpacing>
        <RoomOutlined className={classes.icon} color="primary" />
        <Typography variant="body1">{data.venue}</Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent><GoogleMap lat={data.venueLatLng.lat} lng={data.venueLatLng.lng} /></CardContent>
      </Collapse>
    </Card>
  );
}

export default EventDetailsHeader;
