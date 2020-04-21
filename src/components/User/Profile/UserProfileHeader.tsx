import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Typography, Button } from '@material-ui/core';
import PaperPage from '../../Shared/PaperPage';

const useStyles = makeStyles((theme: Theme) => createStyles({
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16)
  },
  profileBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1, 0)
  }
})
);

interface Props {
  displayName: string
  photoURL?: string
  ocupation?: string
  isCurrentUser: boolean;
}

function UserProfileHeader({ isCurrentUser, displayName, photoURL, ocupation }: Props) {
  const classes = useStyles();

  return (
    <PaperPage>
      <div className={classes.profileBlock}>
        <Avatar className={classes.avatar} alt='profile' src={photoURL || '/assets/images/user.png'} />
        <Typography variant='h6'>{displayName}</Typography>
        <Typography variant='caption'>{ocupation}</Typography>
        {!isCurrentUser && <Button size='small' color='secondary' variant='contained' className={classes.button}>Follow</Button>}
      </div>
    </PaperPage>
  )
}

export default UserProfileHeader;
