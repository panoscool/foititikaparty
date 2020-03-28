import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UserProfileHeader from './UserProfileHeader';
import UserProfileDescription from './UserProfileDescripion';
import UserProfilePhotos from './UserProfilePhotos';
import UserProfileEvents from './UserProfileEvents';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    margin: theme.spacing(2)
  }
})
);

function UserProfilePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UserProfileHeader />
      <UserProfileDescription />
      <UserProfilePhotos />
      <UserProfileEvents />
    </div>
  )
}

export default UserProfilePage;
