import React, { useState, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextInput from '../../Shared/TextInput';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../../context/AuthContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    marginRight: theme.spacing(1)
  }
}))

interface Props {
  formId: string;
  parentId?: number;
  closeForm?: (event?: any) => void;
  addEventComment: (event: any) => void;
}

function EventChatForm({ formId, parentId, closeForm, addEventComment }: Props) {
  const classes = useStyles();
  const { displayName, userId, photoURL } = useContext(AuthContext);
  const [comment, setComment] = useState('');

  function handleChange(event: any) {
    setComment(event.target.value)
  }

  function handleSubmit(event: any) {
    event.preventDefault();


    const newComment = {
      displayName: displayName,
      userId: userId,
      photoURL: photoURL || '/assets/images/user.png',
      text: comment,
      date: Date.now(),
      parentId: parentId
    }

    addEventComment(newComment);
    setComment('');

    if (parentId !== 0) {
      // @ts-ignore
      closeForm();
    }
  }

  return (
    <form onSubmit={handleSubmit} id={formId}>
      <TextInput name='comment' value={comment} multiline rows={2} handleChange={handleChange} />
      <Button className={classes.button} type='submit' size='small' variant="contained" color="primary">
        Send
      </Button>
      {parentId !== 0 && <Button size='small' variant='contained' color='default' onClick={closeForm}>Cancel</Button>}
    </form>
  )
}

export default EventChatForm;
