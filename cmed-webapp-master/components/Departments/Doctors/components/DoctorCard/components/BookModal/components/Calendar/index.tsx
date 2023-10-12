import { Box, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FC } from 'react';
import { ICalendarProps } from '../../../../../../types';
import { CalendarHeader } from '../../../../styled';
import { BookActivity } from '../BookActivity';

const Calendar: FC<ICalendarProps> = ({ events, value, setFieldValue }) => {
  return (
    <Box sx={CalendarHeader}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          showToolbar={false}
          disablePast
          value={value}
          onChange={(newValue) => {
            setFieldValue('currentDay', dayjs(newValue).format('YYYY-MM-DD'));
          }}
          renderInput={(params) => <TextField {...params} />}
          components={{
            ActionBar: () => null,
          }}
          renderDay={(day: any, _selectedDays: any, pickersDayProps: any) => (
            <BookActivity
              key={day.get('D')}
              day={day}
              pickerdData={pickersDayProps}
              values={events}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Calendar;
