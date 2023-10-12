import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import { Rating, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { DoctorRating } from '../../../../../Doctors/types';

const DoctorRating: FC<DoctorRating> = ({ rate, consultations }) => {
  return (
    <Stack sx={{ marginTop: '1px' }} alignItems={'center'} direction={'row'}>
      <Rating
        icon={<StarRounded fontSize={'small'} />}
        emptyIcon={<StarBorderRounded fontSize={'small'} />}
        sx={{ color: 'secondary.dark' }}
        value={rate}
        readOnly
      />
      <Typography variant={'body1'}>
        {rate}{' '}
        <Typography color={'#818181'} component={'span'} variant={'body1'}>
          ({consultations})
        </Typography>
      </Typography>
    </Stack>
  );
};

export default DoctorRating;
