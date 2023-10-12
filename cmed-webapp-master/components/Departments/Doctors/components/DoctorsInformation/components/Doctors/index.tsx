import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FC } from 'react';
import { doctorsImg } from '../../styled/doctors';
import { IDoctorProps } from '../../types';

const Doctors: FC<IDoctorProps> = ({ data }) => {
  const { t } = useTranslation('doctors');
  const { title, img } = data;
  return (
    <Stack spacing={{ sm: '30px', xl: '40px' }} direction={'row'}>
      <Stack flex={1} spacing={{ sm: '15px', xl: '20px' }}>
        <Typography variant={'h4'}>{t('title')}</Typography>
        <Typography>{t('description')}</Typography>
      </Stack>
      <Box sx={doctorsImg}>
        <Image priority fill src={img} alt={title} />
      </Box>
    </Stack>
  );
};

export default Doctors;
