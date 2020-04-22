import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PhotoLibraryOutlined } from '@material-ui/icons';
import PaperPage from '../../Shared/PaperPage';
import { CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    width: 100,
    height: 100,
    margin: theme.spacing(0, 1, 0, 0)
  },
  icon: {
    verticalAlign: 'sub'
  }
})
);

interface Props {
  photos: any
}

function UserProfilePhotos({ photos }: Props) {
  const classes = useStyles();

  return (
    <PaperPage>
      <Typography gutterBottom variant='h6'><PhotoLibraryOutlined className={classes.icon} /> Photos</Typography>
      <div className={classes.root}>
        {photos.map((d: any) => (
          <div key={d.name} className={classes.card}>
            <CardMedia component="img" alt={d.name} image={d.url} />
          </div>
        ))}
      </div>
    </PaperPage>
  )
}

export default UserProfilePhotos;
