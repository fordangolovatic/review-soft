import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { FC } from 'react';
import { doctorsImg } from '../../styled/doctor';
import { IDoctorProps } from '../../types';

const Doctors: FC<IDoctorProps> = ({ data }) => {
  const { t } = useTranslation('mti');
  const { title, img } = data;
  return (
    <Stack spacing={{ sm: '30px', xl: '40px' }} direction={'row'}>
      <Stack flex={1} spacing={{ sm: '15px', xl: '20px' }}>
        <Typography color={'primary'} variant={'h4'}>
          {t('title')}
        </Typography>
        <Typography sx={{ whiteSpace: 'pre-wrap' }}>{t('description')}</Typography>
      </Stack>
      <Box sx={doctorsImg}>
        <Image priority fill src={img} alt={title} />
      </Box>
    </Stack>
  );
};

export default Doctors;
