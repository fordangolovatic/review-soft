import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC, useMemo } from 'react';
import { IConsultationTimePicker } from '../../../../../../types';

const ConsultationTimePicker: FC<IConsultationTimePicker> = ({
  values,
  setFieldValue,
}) => {
  const timeSlots =
    values[dayjs(values.currentDay).format('YYYY-MM-DD')]?.availableSlots;
  const hasTimeSlots = useMemo(() => (timeSlots?.length ?? 0) > 0, [timeSlots]);

  const onTimeSelect = (newTime: string) => {
    if (values[values.currentDay]?.selectedSlots.includes(newTime)) {
      return setFieldValue(values.currentDay, {
        ...values[values.currentDay],
        selectedSlots: values[values.currentDay]?.selectedSlots.filter(
          (s: string) => s !== newTime,
        ),
      });
    }

    setFieldValue(values.currentDay, {
      ...values[values.currentDay],
      selectedSlots: [...(values[values.currentDay]?.selectedSlots ?? []), newTime],
    });
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
      spacing={{ sm: '30px' }}
      width={{ sm: '148px', xl: '188px' }}
    >
      <Typography mt={'5px'} variant={'body1'} color={'secondary.dark'}>
        {!values.currentDay
          ? 'Select date'
          : `${dayjs(values.currentDay).format('D MMM, ddd')}`}
      </Typography>
      <Box
        sx={{
          overflow: 'scroll',
          position: 'absolute',
          height: 'calc(100% - 30px)',
        }}
      >
        {Boolean(values.currentDay) && (
          <Box>
            <Grid id={'available-slots'} container spacing={'8px'}>
              {hasTimeSlots ? (
                timeSlots.map((slot: string, index: number) => (
                  <Grid key={index} item xs={6}>
                    <Button
                      onClick={() => onTimeSelect(slot)}
                      sx={{ borderRadius: '5px', width: '100%' }}
                      variant={
                        values[values.currentDay].selectedSlots.includes(slot)
                          ? 'contained'
                          : 'outlined'
                      }
                      color={'secondary'}
                    >
                      {slot}
                    </Button>
                  </Grid>
                ))
              ) : (
                <Box p={1}>
                  <Typography variant={'body2'} color={'#818181'}>
                    No slots available
                  </Typography>
                </Box>
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ConsultationTimePicker;
