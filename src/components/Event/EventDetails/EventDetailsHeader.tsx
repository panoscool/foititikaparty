import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { Page } from '../../Layout/Page';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(3)
  },
  iamgeResponsive: {
    width: '100%',
    height: 'auto',
    borderRadius: 4
  },
  imageStyle: {
    filter: "brightness(30%)",
    margin: -16
  },
  imageTextStyle: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white"
  }
}));

function EventDetailsHeader() {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.imageStyle}>
        <img src='/assets/categories/culture.jpg' alt='Category' className={classes.iamgeResponsive} />
        <div className={classes.imageTextStyle}>
          <Typography color='inherit'>Pizza night</Typography>
          <Typography color='inherit'>Wednesday 1st January 2020</Typography>
          <Typography color='inherit'>Hosted by Panos K.</Typography>
        </div>
      </div>
      <Button color='primary' variant='contained' className={classes.button}>Join this event</Button>
    </Page>
  )
}

export default EventDetailsHeader;
