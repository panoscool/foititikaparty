import React, { useEffect, useState, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import formatDistance from 'date-fns/formatDistance';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventChatForm from './EventChatForm';
import firebase from '../../../config/firebase';
import { objectToArray, createDataTree } from '../../../utils/helpers';
import { ListSubheader, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing(2, 0)
    },
    nested: {
      paddingLeft: theme.spacing(8),
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    form: {
      padding: theme.spacing(2)
    },
    replyForm: {
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(2)
    },
    secondaryBlock: {
      display: 'block',
      padding: '6px',
      color: 'black',
      borderRadius: '6px',
      backgroundColor: 'lightgrey'
    }
  })
);

function EventDetailsChat() {
  const classes = useStyles();
  const { id } = useParams();
  const [comments, setComments] = useState<any[] | undefined>([]);
  const [form, setForm] = useState({
    show: false,
    comment: null
  });

  useEffect(() => {
    const db = firebase.database();
    const chatRef = db.ref(`event_chat/${id}`);
    chatRef.on('value', function (snapshot) {
      const chat = snapshot.val();
      const formatedChat = objectToArray(chat);

      setComments(formatedChat);
    });
  }, [id])

  function handleOpenReplyForm(id: any) {
    setForm({ show: true, comment: id });
  }

  function handleCloseReplyForm() {
    setForm({ show: false, comment: null });
  }

  async function addEventComment(comment: any) {
    const db = firebase.database();

    try {
      await db.ref(`event_chat/${id}`).push(comment);
    } catch (error) {
      console.error(error);
    }
  }

  const chatTree = comments && createDataTree(comments);

  return (
    <Paper className={classes.paper}>
      <List dense subheader={<ListSubheader>Event Comments</ListSubheader>}>
        <Divider variant="fullWidth" />
        {chatTree?.map(comment => (
          <Fragment key={comment.id}>
            <ListItem>
              <ListItemIcon>
                <Avatar className={classes.avatar} alt={comment.displayName} src={comment.photoURL} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <span>
                    <Link style={{ textDecoration: 'none' }} to={`/profile/${comment.userId}`}>{comment.displayName}</Link>{' '}
                    <Typography variant='caption' color='textSecondary'>{formatDistance(comment.date, Date.now())}</Typography>
                  </span>
                }
                secondary={
                  <span>
                    <span className={classes.secondaryBlock}>{comment.text}</span>
                    <Typography onClick={() => handleOpenReplyForm(comment.id)} style={{ cursor: 'pointer' }} variant='caption' color='textSecondary'>Reply</Typography>
                  </span>
                }
              />
            </ListItem>
            {form.show && form.comment === comment.id &&
              <div className={classes.replyForm}>
                <EventChatForm
                  formId={comment.id}
                  parentId={comment.id}
                  addEventComment={addEventComment}
                  closeForm={handleCloseReplyForm}
                />
              </div>}
            <List component="div" disablePadding>
              {comment.childNodes && comment.childNodes.map((child: any) => (
                <ListItem key={child.id} className={classes.nested}>
                  <ListItemIcon>
                    <Avatar className={classes.avatar} alt={child.displayName} src={child.photoURL} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span>
                        <Link style={{ textDecoration: 'none' }} to={`/profile/${child.userId}`}>{child.displayName}</Link>{' '}
                        <Typography variant='caption' color='textSecondary'>{formatDistance(child.date, Date.now())}</Typography>
                      </span>
                    }
                    secondary={
                      <span className={classes.secondaryBlock}>{child.text}</span>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Fragment>
        ))}
      </List>
      <div className={classes.form}>
        <EventChatForm
          parentId={0}
          formId='newComment'
          addEventComment={addEventComment} />
      </div>
    </Paper>
  );
}

export default EventDetailsChat;
