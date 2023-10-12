import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Icon, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useState } from 'react';
import { EventList } from './components';

export interface EventProps {
  id: number;
  date: Dayjs;
  title: string;
}

const events: EventProps[] = [
  { id: 1, date: dayjs(new Date()).add(4, 'days'), title: '123' },
  { id: 2, date: dayjs(new Date()).add(-12, 'days'), title: '123' },
  { id: 3, date: dayjs(new Date()).add(10, 'days'), title: '123' },
  { id: 4, date: dayjs(new Date()).add(18, 'days'), title: '123' },
];

export const EventCalendar: FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs(new Date()));

  const [nextMonth, setNextMonth] = useState<Dayjs>(
    dayjs(currentMonth).add(1, 'month'),
  );

  const currentMonthName = currentMonth?.format('MMM');

  const nextMonthName = nextMonth?.format('MMM');

  const onNextMonth = (): void => {
    setCurrentMonth((prevState) => prevState.add(1, 'month'));
    setNextMonth((prevState) => prevState.add(1, 'month'));
  };

  const onBackMonth = (): void => {
    setCurrentMonth((prevState) => prevState.add(-1, 'month'));
    setNextMonth((prevState) => prevState.add(-1, 'month'));
  };

  return (
    <Stack>
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
      >
        <Stack alignItems={'center'} spacing={'40px'} direction={'row'}>
          <Button onClick={onBackMonth} color={'secondary'} variant={'text'}>
            <Icon>
              <KeyboardArrowLeft />
            </Icon>
            <Typography>{currentMonthName}</Typography>
          </Button>
        </Stack>
        <Typography color={'secondary'}>{currentMonth.format('YYYY')}</Typography>
        <Stack
          justifyContent={'flex-end'}
          alignItems={'center'}
          spacing={'40px'}
          direction={'row'}
        >
          <Button onClick={onNextMonth} color={'secondary'} variant={'text'}>
            <Typography>{nextMonthName}</Typography>
            <Icon>
              <KeyboardArrowRight />
            </Icon>
          </Button>
        </Stack>
      </Stack>
      {/*    */}
      <Stack
        sx={{
          '& .MuiPickerStaticWrapper-root .MuiPickerStaticWrapper-content .MuiCalendarOrClockPicker-root .MuiCalendarPicker-root .MuiPickersCalendarHeader-root':
            {
              display: 'none',
            },
        }}
        justifyContent={'space-between'}
        direction={'row'}
      >
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              showToolbar={false}
              views={['day']}
              className={'disableToolbar'}
              showDaysOutsideCurrentMonth={false}
              value={currentMonth}
              onChange={(newValue) => {
                setCurrentMonth(dayjs(newValue));
              }}
              renderInput={(params) => <TextField {...params} />}
              components={{
                ActionBar: () => null,
                LeftArrowButton: () => null,
                RightArrowButton: () => null,
              }}
              disablePast
              renderDay={(day, selectedDays, pickersDayProps) => (
                <EventList
                  key={day.get('D')}
                  day={day}
                  pickerdData={pickersDayProps}
                  events={events}
                  setFieldValue={() => null}
                  values={[]}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              className={'disabledToolbar'}
              showToolbar={false}
              views={['day']}
              disablePast
              showDaysOutsideCurrentMonth={false}
              value={nextMonth}
              onChange={(newValue) => {
                setNextMonth(dayjs(newValue));
              }}
              renderInput={(params) => <TextField {...params} />}
              components={{
                ActionBar: () => null,
                LeftArrowButton: () => null,
                RightArrowButton: () => null,
              }}
              renderDay={(day, selectedDays, pickersDayProps) => (
                <EventList
                  key={day.get('D')}
                  day={day}
                  pickerdData={pickersDayProps}
                  events={events}
                  setFieldValue={() => null}
                  values={[]}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Stack>
    </Stack>
  );
};
