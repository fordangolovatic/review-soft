import { Box, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { FC } from 'react';
import { ICalendarProps } from '../../../../../../types';
import { CalendarHeader } from '../../../../styled';

const Calendar: FC<ICalendarProps> = ({ value, onChange }) => {
  return (
    <Box sx={CalendarHeader}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          showToolbar={false}
          value={value}
          onChange={(newValue) => {
            onChange(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
          components={{
            ActionBar: () => null,
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Calendar;
