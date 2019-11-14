import elLocale from 'date-fns/locale/el';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface Props {
  selectedDate: object;
  handleDateChange: (e?: any) => void;
}

function DateForm({ selectedDate, handleDateChange }: Props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={elLocale}>
      <DateTimePicker
        fullWidth
        margin="dense"
        inputVariant="outlined"
        label="Date"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}

export default DateForm;
