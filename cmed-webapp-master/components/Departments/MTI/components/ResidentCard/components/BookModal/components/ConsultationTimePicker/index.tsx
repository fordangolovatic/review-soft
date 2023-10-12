import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { IConsultationTimePicker } from '../../../../../../types';

const ConsultationTimePicker: FC<IConsultationTimePicker> = ({
  date,
  onPick,
  picked,
}) => {
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
        {!date ? 'Select date' : `${dayjs(date).format('D MMM, ddd')}`}
      </Typography>
      <Box
        sx={{
          overflow: 'scroll',
          position: 'absolute',
          height: 'calc(100% - 55px)',
        }}
      >
        {!!date && (
          <Box>
            <Grid container spacing={'8px'}>
              {Array.from(Array(20)).map((picker, i) => (
                <Grid key={i} item xs={6}>
                  <Button
                    onClick={() => onPick(i)}
                    sx={{ borderRadius: '5px', width: '100%' }}
                    variant={picked.includes(i) ? 'contained' : 'outlined'}
                    color={'secondary'}
                  >
                    8:00
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default ConsultationTimePicker;
