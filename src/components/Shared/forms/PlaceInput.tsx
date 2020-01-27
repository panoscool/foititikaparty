import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  autocompleteList: {
    marginTop: 0,
    paddingTop: 0,
    height: 200,
    overflowX: 'auto'
  }
}));

interface Props {
  value: string;
  options: object;
  label: string;
  handleChange: (event: any) => void;
  handleSelect?: (event: any) => void;
}

function PlaceInput({ label, value, options, handleChange, handleSelect }: Props) {
  const classes = useStyles();

  return (
    <PlacesAutocomplete value={value} searchOptions={options} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField fullWidth margin="dense" variant="outlined" label={label} {...getInputProps({ label })} />
          {suggestions.length > 0 && (
            <div className={classes.autocompleteList}>
              {loading && <div>Loading...</div>}
              <List dense>
                {suggestions.map(suggestion => (
                  <ListItem button {...getSuggestionItemProps(suggestion)}>
                    <ListItemText
                      primary={suggestion.formattedSuggestion.mainText}
                      secondary={suggestion.formattedSuggestion.secondaryText}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default PlaceInput;
