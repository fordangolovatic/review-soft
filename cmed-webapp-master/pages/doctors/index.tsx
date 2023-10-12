import { Box } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { DoctorsInformation, PageWrapper } from '../../components';
import { Breadcrumb } from '../../components/Breadcrumb';
import { CustomContainer } from '../../components/MuiCustom';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'doctors', 'departments'],
        null,
        ['en'],
      )),
    },
  };
};
const Doctors: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer>
        <Box padding={'30px 0 40px 0'}>
          <Breadcrumb />
        </Box>
        <DoctorsInformation />
      </CustomContainer>
    </PageWrapper>
  );
};

export default Doctors;
