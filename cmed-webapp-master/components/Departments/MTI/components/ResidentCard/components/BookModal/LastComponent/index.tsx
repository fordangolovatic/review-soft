import { Box, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { Anamnes } from '../components';

interface ILastComponent {
  pickedDate: number[];
}
const LastComponent: FC<ILastComponent> = ({ pickedDate }) => {
  return (
    <>
      <Box>
        <Anamnes />
      </Box>
      {!!pickedDate.length && (
        <Stack mb={'20px'} alignItems={'flex-end'}>
          <Stack spacing={'10px'} direction={'row'}>
            <Typography variant={'body1'}>Session:</Typography>
            <Typography
              color={'secondary'}
              variant={'body1'}
            >{`x${pickedDate.length} 8:00`}</Typography>
          </Stack>
          <Stack spacing={'10px'} direction={'row'}>
            <Typography variant={'body1'}>Amount to be paid:</Typography>
            <Typography variant={'body1'} color={'secondary'}>{`${
              pickedDate.length * 15
            }$`}</Typography>
          </Stack>
        </Stack>
      )}
      <Typography mt={'15px'} color={'#818181'} variant={'body1'} textAlign={'end'}>
        All data that is filled in is confidential and protected by law.
      </Typography>
    </>
  );
};

export default LastComponent;
