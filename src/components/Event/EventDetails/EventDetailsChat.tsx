import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendOutlined from '@material-ui/icons/SendOutlined';
import Paper from '@material-ui/core/Paper';
import TextInput from '../../Shared/forms/TextInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1, 0)
    },
    paper: {
      margin: theme.spacing(2, 0, 2, 2),
      padding: theme.spacing(2)
    },
    chatLabel: {
      color: 'white',
      backgroundColor: '#212121',
      padding: 4,
      borderRadius: 4,
      margin: theme.spacing(-2, -2, 0, -2)
    }
  })
);

function EventDetailsChat() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.chatLabel}>
        <Typography variant="h6" align="center">
          Chat about this event
        </Typography>
      </div>
      <form>
        <TextInput rows="3" multiline />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendOutlined />}
        >
          Add Reply
        </Button>
      </form>
    </Paper>
  );
}

export default EventDetailsChat;
