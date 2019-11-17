import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Page } from '../Layout/Page';
import InputForm from '../Shared/forms/InputForm';
import DateForm from '../Shared/forms/DateForm';
import SelectForm from '../Shared/forms/SelectForm';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1, 0, 1, 1)
  },
  btnAlignment: {
    textAlign: 'right'
  },
  sectionLabel: {
    paddingTop: 16
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
    category: 'drinks',
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

  const categories = [
    { label: 'Drinks', value: 'drinks' },
    { label: 'Food', value: 'food' },
    { label: 'Film', value: 'film' },
    { label: 'Music', value: 'music' },
    { label: 'Culture', value: 'culture' },
    { label: 'Travel', value: 'travel' }
  ];

  return (
    <Page>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Typography color="secondary">EVENT DETAILS</Typography>
        <InputForm
          name="title"
          label="Event Title"
          value={state.title}
          handleChange={handleChange}
        />
        <SelectForm
          name="category"
          label="Category"
          optionsArray={categories}
          value={state.category}
          handleChange={handleChange}
        />
        <InputForm
          rows="5"
          multiline
          name="description"
          label="Description"
          value={state.description}
          handleChange={handleChange}
        />
        <Typography color="secondary" className={classes.sectionLabel}>
          EVENT LOCATION DETAILS
        </Typography>
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
          label="Date"
          selectedDate={selectedDate}
          handleDateChange={handleDateChange}
        />
        <div className={classes.btnAlignment}>
          <Button
            component={Link}
            to="/"
            color="default"
            variant="contained"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="contained"
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
