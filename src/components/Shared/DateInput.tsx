import React from 'react';
import elLocale from 'date-fns/locale/el';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface Props {
  label: string;
  dateType?: string;
  selectedDate: any;
  handleDateChange: (e?: any) => void;
}

function DateInput({ label, dateType, selectedDate, handleDateChange }: Props) {

  if (dateType === 'date') {
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        // openTo="year"
        fullWidth
        disableFuture
        margin="dense"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        label={label}
        views={["year", "month", "date"]}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  } else if (dateType === 'time') {
    return <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TimePicker
        fullWidth
        clearable
        margin="dense"
        inputVariant="outlined"
        ampm={false}
        label={label}
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  }

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
