import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { Page } from '../../Layout/Page';
import TextInput from '../../Shared/forms/TextInput';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0),
  },
  chatLabel: {
    color: 'white',
    backgroundColor: '#212121',
    padding: 4,
    borderRadius: 4,
    margin: theme.spacing(-2, -2, 0, -2)
  }
}));

function EventDetailsChat() {
  const classes = useStyles();

  return (
    <Page>
      <div className={classes.chatLabel}><Typography variant='h6' align='center'>Chat about this event</Typography></div>
      <form>
        <TextInput rows="3" multiline />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditOutlined />}>Add Reply</Button>
      </form>
    </Page>
  )
}

export default EventDetailsChat;
