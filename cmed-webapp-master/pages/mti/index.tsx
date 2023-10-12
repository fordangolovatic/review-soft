import { Box } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PageWrapper } from '../../components';
import { Breadcrumb } from '../../components/Breadcrumb';
import { MtiInformation } from '../../components/Departments/MTI/components';
import { CustomContainer } from '../../components/MuiCustom';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'mti', 'departments'],
        null,
        ['en'],
      )),
    },
  };
};
const Mti: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer>
        <Box padding={'30px 0 40px 0'}>
          <Breadcrumb />
        </Box>
        <MtiInformation />
      </CustomContainer>
    </PageWrapper>
  );
};

export default Mti;
