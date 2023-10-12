import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import { IDoctorInfoProps } from '../../../../../../types';
import { DoctorRating } from '../../../index';

const DoctorInfo: FC<IDoctorInfoProps> = ({ resident }) => {
  const { specialities, firstName, lastName } = resident;
  return (
    <Stack>
      <Box
        sx={{
          width: { sm: '180px', xl: '220px' },
          height: { sm: '180px', xl: '220px' },
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <Image fill src={'/images/doctorCard.png'} alt={'avatar'} />
      </Box>
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        alignItems={'center'}
      >
        <Typography sx={{ paddingLeft: '2px' }} variant={'subtitle1'}>
          {firstName} {lastName}
        </Typography>
        <Chip
          sx={{
            fontSize: { sm: '10px' },
            padding: { sm: '0px 7px' },
            height: 'auto',
          }}
          size={'small'}
          label={'Resident'}
          color={'secondary'}
        />
      </Stack>
      <Stack spacing={{ sm: '8px' }}>
        <Typography color={'secondary.dark'} variant={'body1'}>
          {specialities?.join(', ')}
        </Typography>
        <DoctorRating
          rate={resident.rating?.rate || 0}
          consultations={resident.rating?.consultations || 0}
        />
      </Stack>
      <Typography
        sx={{ marginTop: { sm: '5px' }, textDecoration: 'underline' }}
        variant={'body1'}
        color={'secondary'}
      >
        View profile & reviews
      </Typography>
    </Stack>
  );
};

export default DoctorInfo;
