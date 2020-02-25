import elLocale from 'date-fns/locale/el';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface Props {
  label: string;
  selectedDate: any;
  handleDateChange: (e?: any) => void;
}

function DateInput({ label, selectedDate, handleDateChange }: Props) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={elLocale}>
      <DateTimePicker
        // disableToolbar
        fullWidth
        margin="dense"
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy hh:mm"
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
      />

    </MuiPickersUtilsProvider>
  );
}

export default DateInput;
