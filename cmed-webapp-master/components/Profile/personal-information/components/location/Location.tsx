import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useAccountQuery } from '../../../../../api/hooks/account';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { FormikProps } from '../full-name/FullName';
import { Address, City, Country, State } from './components';
import { LocationSkeleton } from './LocationSkeleton';

type LocationProps = FormikProps;

export const Location: FC<LocationProps> = (props) => {
  const { t } = useTranslation('profile');
  const translations = {
    location: t('pI-location'),
    _location: t('pI-_location'),
  };
  const { isLoading } = useAccountQuery();

  return (
    <SkeletonCollection isLoading={isLoading} skeleton={<LocationSkeleton />}>
      <Box>
        <Typography variant={'subtitle1'}>{translations.location}</Typography>

        <Typography
          mb={{ sm: '12px', xl: '20px' }}
          color={'#828282'}
          variant={'body1'}
        >
          {translations._location}
        </Typography>

        <Grid container spacing={'20px'}>
          <Grid item xs={6}>
            <Country {...props} />
          </Grid>

          <Grid item xs={6}>
            <State {...props} />
          </Grid>

          <Grid item xs={6}>
            <City {...props} />
          </Grid>

          <Grid item xs={6}>
            <Address {...props} />
          </Grid>
        </Grid>
      </Box>
    </SkeletonCollection>
  );
};
