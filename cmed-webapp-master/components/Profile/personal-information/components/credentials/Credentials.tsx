import { Box, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import TextFieldInput from '../../../UI/Input/TextFieldInput';

export const Credentials: FC = () => {
  const { t } = useTranslation('profile');
  const translations = {
    email: t('pI-email'),
    wallet: t('pI-wallet'),
    password: t('pI-password'),
    confirmPassword: t('pI-confirmPassword'),
  };
  return (
    <Box>
      <Grid container spacing={'20px'}>
        <Grid item xs={6}>
          <TextFieldInput
            label={translations.email}
            placeholder={'username@gmail.com'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldInput
            label={translations.wallet}
            placeholder={'Virtual wallet'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldInput
            label={translations.password}
            placeholder={'Enter your password'}
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldInput
            label={translations.confirmPassword}
            placeholder={'Confirm your password'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
