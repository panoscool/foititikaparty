import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PhotoLibraryOutlined } from '@material-ui/icons';
import PaperPage from '../../Shared/PaperPage';

const useStyles = makeStyles((theme: Theme) => createStyles({
  icon: {
    verticalAlign: 'sub'
  }
})
);

function UserProfilePhotos() {
  const classes = useStyles();
  return (
    <PaperPage>
      <Typography gutterBottom variant='h6'><PhotoLibraryOutlined className={classes.icon} /> Photos</Typography>
    </PaperPage>
  )
}

export default UserProfilePhotos;
