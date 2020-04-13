import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { LibraryBooksOutlined } from '@material-ui/icons';
import PaperPage from '../../Shared/PaperPage';

const useStyles = makeStyles((theme: Theme) => createStyles({
  icon: {
    verticalAlign: 'sub'
  }
})
);

function UserProfileEvents() {
  const classes = useStyles();

  return (
    <PaperPage>
      <Typography gutterBottom variant='h6'><LibraryBooksOutlined className={classes.icon} /> Events</Typography>
    </PaperPage>
  )
}

export default UserProfileEvents;
