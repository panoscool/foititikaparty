import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextInput from '../Shared/forms/TextInput';
import DateInput from '../Shared/forms/DateInput';
import SelectInput from '../Shared/forms/SelectInput';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '60%',
      padding: theme.spacing(2),
      margin: '0 auto',
      [theme.breakpoints.down('md')]: {
        width: 'auto',
        margin: theme.spacing(2)
      }
    },
    button: {
      margin: theme.spacing(1, 0, 1, 1)
    },
    btnAlignment: {
      textAlign: 'right'
    },
    sectionLabel: {
      paddingTop: 16
    }
  })
);

interface Props {
  handleFormSubmit: (event: any) => void;
}

function EventForm({ handleFormSubmit }: Props) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(Date.now());
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
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Typography color="secondary">EVENT DETAILS</Typography>
        <TextInput
          name="title"
          label="Event Title"
          value={state.title}
          handleChange={handleChange}
        />
        <SelectInput
          name="category"
          label="Category"
          optionsArray={categories}
          value={state.category}
          handleChange={handleChange}
        />
        <TextInput
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
        <TextInput
          name="city"
          label="City"
          value={state.city}
          handleChange={handleChange}
        />
        <TextInput
          name="venue"
          label="Venue"
          value={state.venue}
          handleChange={handleChange}
        />
        <TextInput
          name="hostedBy"
          label="Hosted By"
          value={state.hostedBy}
          handleChange={handleChange}
        />
        <DateInput
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
    </Paper>
  );
}

export default EventForm;
