import { Box, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getInitials } from '../../../../../../../../../utilities/functions';
import { DisabledWrapper } from '../../../../../../../../QuickActionsMenu/DisabledWrapper';
import { IDoctorInfoProps } from '../../../../../../types';
import { DoctorRating } from '../../../index';

const DoctorInfo: FC<IDoctorInfoProps> = ({ doctor }) => {
  const { activityProgram, specialities, firstName, lastName, profileImage } =
    doctor;
  const { t } = useTranslation('common');

  const lowestPrice = useMemo(() => {
    const prices = doctor?.activityProgram
      .map((dayProgram) => +dayProgram.price)
      .sort((first, second) => first - second);

    return prices?.[0];
  }, [activityProgram]);

  return (
    <Stack>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          width: { sm: '180px', xl: '220px' },
          height: { sm: '180px', xl: '220px' },
          position: 'relative',
          marginBottom: '20px',
          background: '#EFEFEF',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {profileImage && (
          <Image
            fill
            src={profileImage}
            alt={'avatar'}
            style={{ objectFit: 'cover' }}
          />
        )}

        {!profileImage && (
          <Typography
            variant={'h2'}
            fontWeight={'700 !important'}
            sx={{ userSelect: 'none' }}
          >
            {getInitials(`${firstName} ${lastName}`)}
          </Typography>
        )}
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
          label={'Doctor'}
          color={'darkGreen'}
        />
      </Stack>

      <Stack spacing={{ sm: '8px' }}>
        <Typography color={'secondary.dark'} variant={'body1'}>
          {specialities?.map((el) => el.specialityName).join(', ')}
        </Typography>

        <Typography color={'primary'} variant={'body1'}>
          {t('startingFrom')} {lowestPrice}$ / {t('session')}
        </Typography>

        <DisabledWrapper>
          <DoctorRating
            rate={doctor.rating?.rate || 0}
            consultations={doctor.rating?.consultations || 0}
          />
        </DisabledWrapper>
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
