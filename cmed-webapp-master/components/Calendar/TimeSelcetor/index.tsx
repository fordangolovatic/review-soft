import { Button, InputAdornment, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { FormikValues } from 'formik';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useActivityProgramQuery } from '../../../api/hooks/activity-program';
import { PriceField } from './styled';

interface TimeSelectorProps {
  values: FormikValues;
  setFieldValue: (field: string, value: any) => void;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

const TimeSelector: FC<TimeSelectorProps> = ({
  values,
  setFieldValue,
  handleChange,
}) => {
  const [timeArray, setTimeArray] = useState<string[]>([]);
  const { data: activityProgram } = useActivityProgramQuery();

  useEffect(() => {
    const start = new Date('1900-01-01T09:30:00');
    const end = new Date('1900-01-01T20:00:00');
    const diff = 1000 * 60 * 15;
    const timeArr = [];

    for (let time = start; time <= end; time = new Date(time.getTime() + diff)) {
      const hour = time.getHours().toString().padStart(2, '0');
      const minute = time.getMinutes().toString().padStart(2, '0');
      timeArr.push(`${hour}:${minute}`);
    }

    setTimeArray(timeArr);
  }, []);

  const toggleTime = (timeSlot: string) => {
    if (values[values.currentDate]?.slots.includes(timeSlot)) {
      return setFieldValue(values.currentDate, {
        ...values[values.currentDate],
        slots: values[values.currentDate].slots.filter(
          (s: string) => s !== timeSlot,
        ),
      });
    }

    setFieldValue(values.currentDate, {
      ...values[values.currentDate],
      slots: [...(values[values.currentDate]?.slots ?? []), timeSlot],
    });
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <Typography
          color={'#000000'}
          sx={{ fontWeight: '400 !important' }}
          fontSize={'16px'}
        >
          Choose the time at which you are ready to consult
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderLeft: '1.5px solid #818181',
            paddingLeft: '20px',
          }}
        >
          <Typography
            color={'#000000'}
            sx={{ fontWeight: '400 !important' }}
            fontSize={'16px'}
            width={'183px'}
          >
            The price of the consultation on this day
          </Typography>
          <PriceField
            id={'consultation-price'}
            name={`${values.currentDate}.price`}
            value={values[values.currentDate]?.price}
            type={'number'}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment
                  position={'start'}
                  sx={{ paddingLeft: '10px', color: '#00534C' }}
                >
                  <Typography>$</Typography>
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <div
        id={'time-selector'}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
      >
        {timeArray.map((time) => (
          <Button
            disabled={Boolean(
              activityProgram?.find(
                (aP) =>
                  dayjs(aP.date).isSame(values.currentDate, 'day') &&
                  aP.consultations?.find((c) => c.startTime === time),
              ),
            )}
            key={time}
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#00A04A',
                borderColor: '#00A04A',
              },
              backgroundColor: values[values.currentDate]?.slots.includes(time)
                ? 'inherit'
                : '#00A04A',
              color: values[values.currentDate]?.slots.includes(time)
                ? '#00A04A'
                : 'white',
              border: '1px solid #00A04A',
            }}
            onClick={() => toggleTime(time)}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;
