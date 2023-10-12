import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { findBox, findButton, findWrapper } from '../../styled/find';
import { IFindProps } from '../../types';

const Find: FC<IFindProps> = () => {
  const { t } = useTranslation('mti');
  const { asPath } = useRouter();
  return (
    <Stack alignItems={'center'} sx={findBox} bgcolor={'rgba(218, 44, 56, 0.1)'}>
      <Stack
        alignItems={'center'}
        spacing={{ sm: '15px', xl: '20px' }}
        maxWidth={'600px'}
        sx={findWrapper}
      >
        <Typography textAlign={'center'} variant={'h2'} color={'primary'}>
          {t('beginMti')}
        </Typography>
        <Typography textAlign={'center'} variant={'body1'} color={'secondary.dark'}>
          {t('beginMtiDescription')}
        </Typography>
        <Box>
          <Link prefetch href={`${asPath}/residents`} passHref>
            <Button
              sx={findButton}
              color={'secondary'}
              component={'span'}
              variant={'contained'}
            >
              {`${t('common:o-goTo')} ${t('common:b-mti')}`}
            </Button>
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Find;
