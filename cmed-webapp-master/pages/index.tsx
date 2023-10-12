import { Box } from '@mui/material';
import Gleap from 'gleap';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';
import { PageWrapper } from '../components';
import { Departments } from '../components/HomePage/Departments';
import Ecosystem from '../components/HomePage/Ecosystem/Ecosystem';
import Header from '../components/HomePage/Header';
import KeepInformed from '../components/HomePage/KeepInformed/KeepInformed';
import PaperWrapper from '../components/HomePage/PaperWrapper/PaperWrapper';
import Works from '../components/HomePage/Works/Works';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'homePage'], null, [
        'en',
      ])),
    },
  };
};

const Landing: NextPage = () => {
  useEffect(() => {
    Gleap.initialize(process.env.NEXT_PUBLIC_GLEAP_API_KEY ?? '');
  }, []);

  return (
    <PageWrapper>
      <Header />
      <Box pt={{ sm: '93px', xl: '176px' }}>
        <Departments />
      </Box>
      <PaperWrapper
        br={'130px'}
        bg={'#F9F9F9'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: { sm: '90px' },
          marginTop: { xs: '60px', sm: '70px' },
        }}
      >
        <Works />
        <PaperWrapper
          bg={'#fff'}
          br={'130px'}
          sx={{
            maxWidth: {
              xl: '1640px',
              md: '1092px',
              sm: '630px',
              xs: 'fit-content',
            },
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            overflow: 'hidden',
          }}
        >
          <Ecosystem />
          <PaperWrapper
            bg={'#ECF5F4'}
            sx={{
              maxWidth: {
                xl: '1640px',
                md: '1092px',
                sm: '630px',
                xs: 'fit-content',
              },
              width: '100%',
              padding: { xs: '20px', sm: '0px' },
            }}
            br={'130px'}
          >
            <KeepInformed />
          </PaperWrapper>
        </PaperWrapper>
      </PaperWrapper>
    </PageWrapper>
  );
};

export default Landing;
