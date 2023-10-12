import { Box, Stack, Typography } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PageWrapper } from '../../components';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Anamnes, Specialities } from '../../components/Emergency';
import LatestNews from '../../components/LatestNews';
import { CustomContainer } from '../../components/MuiCustom';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'emergency'], null, [
        'en',
        'ro',
      ])),
    },
  };
};
const Emergency: NextPage = () => {
  const { t } = useTranslation('emergency');
  return (
    <PageWrapper>
      <CustomContainer>
        <Box my={'35px'}>
          <Breadcrumb />
        </Box>
        <Stack spacing={'40px'}>
          <Typography color={'primary'} variant={'subtitle1'}>
            {t('titlePage')}
          </Typography>
          <Typography variant={'body1'}>{t('descriptionEmergency')}</Typography>
          <Stack spacing={'20px'}>
            <Specialities />
            <Anamnes />
          </Stack>
        </Stack>
        <LatestNews />
      </CustomContainer>
    </PageWrapper>
  );
};

export default Emergency;
