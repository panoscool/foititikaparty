import React from 'react';
import format from 'date-fns/format';
import differenceInYears from 'date-fns/differenceInYears';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { InfoOutlined, FavoriteBorder } from '@material-ui/icons';
import PaperPage from '../../Shared/PaperPage';

const useStyles = makeStyles((theme: Theme) => createStyles({
  icon: {
    verticalAlign: 'sub'
  }
})
);

interface DataObject {
  displayName: string
  date: any
  city: string
  country: string
  about: string
  createdAt: any
  interests: string[]
}

interface Props {
  data: DataObject
}

function UserProfileDescription({ data }: Props) {
  const { displayName, date, city, country, about, createdAt, interests } = data;
  const classes = useStyles();

  return (
    <PaperPage>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7}>
          <Typography gutterBottom variant='h6'><InfoOutlined className={classes.icon} /> About {displayName.substr(0, displayName.indexOf(' '))}</Typography>
          <Typography variant='body2'>Date of Birth: <strong>{format(date.toDate(), 'dd MMMM yyyy')}, ({differenceInYears(Date.now(), date.toDate())})</strong></Typography>
          <Typography variant='body2'>Currently in: <strong>{city}</strong></Typography>
          <Typography variant='body2'>Originally from: <strong>{country}</strong></Typography>
          <Typography gutterBottom variant='body2'>Member since: <strong>{format(createdAt.toDate(), 'dd MMMM yyyy')}</strong></Typography>
          <Typography variant='body2'>{about}</Typography>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography gutterBottom variant='h6'><FavoriteBorder className={classes.icon} /> Interests</Typography>
          {interests ? interests.map((itm, idx) => <Typography key={idx} variant='body2'>{itm}</Typography>) : 'No interests'}
        </Grid>
      </Grid>
    </PaperPage>
  )
}

export default UserProfileDescription;
