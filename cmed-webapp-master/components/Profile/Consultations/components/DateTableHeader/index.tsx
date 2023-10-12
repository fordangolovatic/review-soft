import { Box, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useMetadataQuery } from '../../../../../api/hooks/metadata';

export const DateTableHeader = () => {
  const { t } = useTranslation('profile');
  const { data: metadata } = useMetadataQuery();

  return (
    <Stack mt={'20px'} direction={'row'} justifyContent={'space-between'}>
      <Stack direction={'row'} justifyContent={'space-between'} width={'40%'}>
        <Stack pr={'10px'} flex={1.2}>
          {t('c-date')}
        </Stack>

        <Stack pr={'10px'} flex={1}>
          {metadata?.accountType === 'doctor' ? t('c-patient') : t('c-doctor')}
        </Stack>

        <Stack pr={'10px'} flex={0.5}>
          {t('c-price')}
        </Stack>
      </Stack>

      <Stack pr={'10px'} flex={1}>
        {t('c-treatmentPlan')}
      </Stack>

      <Stack pr={'10px'} flex={1}>
        {t('c-comments')}
      </Stack>

      <Box pr={'10px'} flex={1}>
        {t('c-contact')}
      </Box>
    </Stack>
  );
};
