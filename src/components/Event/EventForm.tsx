import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Page from '../Layout/Page';
import InputForm from '../Shared/forms/InputForm';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  btnAlignment: {
    textAlign: 'right'
  }
}));

function EventForm() {
  const classes = useStyles();

  return (
    <Page>
      <form>
        <InputForm name='title' label='Event Title' />
        <InputForm type='date' name='date' />
        <InputForm name='city' label='City' />
        <InputForm name='venue' label='Venue' />
        <InputForm name='hostedBy' label='Hosted By' />
        <div className={classes.btnAlignment}>
          <Button variant='contained' color='default' className={classes.button}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary' className={classes.button}>Submit</Button>
        </div>
      </form>
    </Page>
  )
}

export default EventForm;
