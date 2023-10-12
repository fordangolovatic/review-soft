import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useMetadataQuery } from '../../../../api/hooks/metadata';
import { useGlobalState } from '../../../../utilities/global-state';

interface HeaderProps {
  openModal: () => void;
}
export const Title: FC<HeaderProps> = ({ openModal }) => {
  const { data: metadata } = useMetadataQuery();
  const { setIsAuthMethod } = useGlobalState();
  const { t } = useTranslation('questions');
  return (
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
      <Typography variant={'h4'} color={'primary'}>
        {t('askDoctor')}
      </Typography>
      <Box>
        <Button
          name={'ask-a-doctor'}
          onClick={
            metadata?.accountType
              ? openModal
              : () =>
                  setIsAuthMethod({
                    open: true,
                    type: 'sign-in',
                    redirect: '/ask-doctor',
                  })
          }
          variant={'contained'}
          color={'darkGreen'}
        >
          {t('askDoctor').split(' ')[0]}
        </Button>
      </Box>
    </Stack>
  );
};
