import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import React, { FC } from 'react';
import bg from '../../../public/images/bgHomePage.png';
import mobileBg from '../../../public/images/mbg.png';
import useCustomTheme from '../../../utilities/hooks/useTheme';
import { CustomContainer } from '../../MuiCustom';
import SearchForm from '../SearchForm';

const ResponsiveBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    height: '790px',
    '& img': {
      position: 'absolute',
      top: '196px',
      objectFit: 'cover',
      width: '100%',
    },
  },
  [theme.breakpoints.up('sm')]: {
    height: '551px',
    '& img': {
      left: '0',
      top: '-53px',
      height: '604px',
      width: '100%',
      position: 'absolute',
      zIndex: '0',
      objectFit: 'cover',
    },
  },
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.up('xl')]: {
    height: '822px',
    '& img': {
      height: '896px',
      width: '100%',
      position: 'absolute',
      top: '-74px',
      zIndex: '0',
      objectFit: 'cover',
    },
  },
}));

const HomePageHeader: FC = () => {
  const { t } = useTranslation('homePage');
  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ResponsiveBox>
      <Box
        sx={{
          [theme.breakpoints.down('sm')]: {
            overflow: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Image src={mobile ? mobileBg : bg} alt={'bg'} />
      </Box>
      <CustomContainer sx={{ zIndex: 2, height: '100%' }}>
        <Stack
          direction="column"
          sx={{
            [theme.breakpoints.down('sm')]: {
              alignItems: 'center',
              textAlign: 'center',
            },
          }}
        >
          <Stack mb="20px" direction="column" spacing="9px" paddingTop="57px">
            <Typography color={'primary'} variant={'h1'}>
              <Box fontWeight="fontWeightMedium">{t('headerTitleOne')}</Box>
            </Typography>
            <Typography color={'secondary.dark'} variant={'h1'}>
              <Box fontWeight="fontWeightMedium">{t('headerTitleTwo')}</Box>
            </Typography>
            <Typography color={'primary'} variant={'h1'}>
              <Box fontWeight="fontWeightMedium">{t('headerTitleThree')}</Box>
            </Typography>
          </Stack>
          <Typography mb="24px" variant="subtitle1" maxWidth={'388px'}>
            {t('headerSubtitle')}
          </Typography>
          <Box>
            <Button
              href={'/ask-doctor'}
              sx={{
                padding: '12px 21.5px',
                [theme.breakpoints.down('sm')]: {
                  position: 'absolute',
                  bottom: '140px',
                  backgroundColor: 'white',
                  padding: '20px 27px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }}
              variant="outlined"
            >
              {t('common:askAFreeQuestion')}
            </Button>
          </Box>
        </Stack>
        <SearchForm />
      </CustomContainer>
    </ResponsiveBox>
  );
};

export default HomePageHeader;
