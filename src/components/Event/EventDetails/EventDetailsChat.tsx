import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import Page from '../../Layout/Page';
import InputForm from '../../Shared/forms/InputForm';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0),
  },
  chatLabel: {
    color: 'white',
    backgroundColor: '#009688',
    padding: 8,
    borderRadius: 4,
  }
}));

function EventDetailsChat() {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.chatLabel}><Typography variant='h5' align='center'>Chat about this event</Typography></div>
      <form>
        <InputForm rows="3" multiline />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<EditOutlined />}>Add Reply</Button>
      </form>
    </Page>
  )
}

export default EventDetailsChat;
