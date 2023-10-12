import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Icon, Stack, TextField, Typography } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FormikValues } from 'formik';
import { ChangeEvent, FC, useState } from 'react';
import { EventList } from '../Social/EventsContent/components/MyEvents/components/EventCalendar/components';

interface CalendarProps {
  values: FormikValues;
  setFieldValue: (field: string, value: any) => void;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  handleSubmit: () => void;
  isValid?: boolean;
}

export const Calendar: FC<CalendarProps> = ({ values, setFieldValue }) => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs(new Date()));

  const [nextMonth, setNextMonth] = useState<any>(
    dayjs(currentMonth).add(1, 'month'),
  );

  const currentMonthName = currentMonth?.format('MMM');

  const nextMonthName = nextMonth?.format('MMM');

  const onNextMonth = (): void => {
    setCurrentMonth((prevState) => prevState.add(1, 'month'));
    setNextMonth((prevState: Dayjs) => prevState.add(1, 'month'));
  };

  const onBackMonth = (): void => {
    setCurrentMonth((prevState) => prevState.add(-1, 'month'));
    setNextMonth((prevState: Dayjs) => prevState.add(-1, 'month'));
  };

  const handleNewDate = (newDate: Date) => {
    const newSelectedDate = dayjs(newDate).format('YYYY-MM-DD');
    setFieldValue('currentDate', newSelectedDate);

    if (!values[newSelectedDate]) {
      setFieldValue(newSelectedDate, {
        price: values.deafultPrice,
        slots: [],
      });
    }
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
          <Button
            id={'next-month'}
            onClick={onNextMonth}
            color={'secondary'}
            variant={'text'}
          >
            <Typography>{nextMonthName}</Typography>
            <Icon>
              <KeyboardArrowRight />
            </Icon>
          </Button>
        </Stack>
      </Stack>
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
              views={['day']}
              className={'disableToolbar'}
              showDaysOutsideCurrentMonth={false}
              value={currentMonth}
              onChange={(newValue) => {
                setCurrentMonth(dayjs(newValue));
                handleNewDate(new Date(newValue.toString()));
              }}
              renderInput={(params: any) => <TextField {...params} />}
              components={{
                ActionBar: () => null,
              }}
              disablePast
              renderDay={(day: any, _selectedDays: any, pickersDayProps: any) => (
                <EventList
                  key={day.get('D')}
                  day={day}
                  pickerdData={pickersDayProps}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              className={'disabledToolbar'}
              views={['day']}
              disablePast
              showDaysOutsideCurrentMonth={false}
              value={nextMonth}
              onChange={(newValue: any) => {
                setNextMonth(dayjs(newValue));
                handleNewDate(new Date(newValue.toString()));
              }}
              components={{
                ActionBar: () => null,
              }}
              renderInput={() => <></>}
              renderDay={(day: any, _selectedDays: any, pickersDayProps: any) => (
                <EventList
                  key={day.get('D')}
                  day={day}
                  pickerdData={pickersDayProps}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Stack>
    </Stack>
  );
};
