import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Page from '../Layout/Page';
import InputForm from '../Shared/forms/InputForm';
import DateForm from '../Shared/forms/DateForm';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0, 1, 1)
  },
  btnAlignment: {
    textAlign: 'right'
  }
}));

interface Props {
  handleFormSubmit: (event: any) => void;
}

function EventForm({ handleFormSubmit }: Props) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = useState({
    title: '',
    description: '',
    city: '',
    venue: '',
    hostedBy: ''
  });

  function handleChange(event?: any) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  function handleSubmit(event?: any) {
    event.preventDefault();

    handleFormSubmit({ ...state, selectedDate });
  }

  return (
    <Page>
      <form onSubmit={handleSubmit} autoComplete="off">
        <InputForm
          name="title"
          label="Event Title"
          value={state.title}
          handleChange={handleChange}
        />
        <InputForm
          rows="5"
          multiline
          name="description"
          value={state.description}
          handleChange={handleChange}
        />
        <InputForm
          name="city"
          label="City"
          value={state.city}
          handleChange={handleChange}
        />
        <InputForm
          name="venue"
          label="Venue"
          value={state.venue}
          handleChange={handleChange}
        />
        <InputForm
          name="hostedBy"
          label="Hosted By"
          value={state.hostedBy}
          handleChange={handleChange}
        />
        <DateForm
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
        <div className={classes.btnAlignment}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </form>
    </Page>
  );
}

export default EventForm;
