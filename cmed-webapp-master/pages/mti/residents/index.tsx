import { Box, Stack } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { PageWrapper } from '../../../components';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { FiltersCollection, Mti } from '../../../components/Departments';
import { CountriesFilter } from '../../../components/FiltersCollection/components/CountriesFilter';
import { LanguagesFilter } from '../../../components/FiltersCollection/components/LanguagesFilter';
import { PeriodFilter } from '../../../components/FiltersCollection/components/PeriodFilter';
import { SpecialitiesFilter } from '../../../components/FiltersCollection/components/SpecialitiesFilter';
import LatestNews from '../../../components/LatestNews';
import { CustomContainer } from '../../../components/MuiCustom';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['mti', 'common', 'departments'],
        null,
        ['en'],
      )),
    },
  };
};

const Department: NextPage = () => {
  const { t } = useTranslation('departments');

  return (
    <PageWrapper>
      <CustomContainer>
        <Stack>
          <Box my={'35px'}>
            <Breadcrumb />
          </Box>
          <Stack flex={1} direction={'row'}>
            <FiltersCollection
              title={t<string>('filterTitleOne')}
              subtitle={t<string>('filterTitleTwo')}
            >
              <>
                <SpecialitiesFilter />
                <LanguagesFilter />
                <CountriesFilter />
                <PeriodFilter />
              </>
            </FiltersCollection>{' '}
            <Mti />
          </Stack>
          <Box mt={{ sm: '70px' }}>
            <LatestNews />
          </Box>
        </Stack>
      </CustomContainer>
    </PageWrapper>
  );
};

export default Department;
