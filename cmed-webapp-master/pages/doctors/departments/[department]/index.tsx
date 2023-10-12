import { Box, Stack } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { specialitiesApi } from '../../../../api/service/specialities/specialitiesApi';
import { PageWrapper } from '../../../../components';
import { Breadcrumb } from '../../../../components/Breadcrumb';
import { Doctors, FiltersCollection } from '../../../../components/Departments';
import ControlFilters from '../../../../components/FiltersCollection/components/ControlFilters';
import { CountriesFilter } from '../../../../components/FiltersCollection/components/CountriesFilter';
import { LanguagesFilter } from '../../../../components/FiltersCollection/components/LanguagesFilter';
import { PeriodFilter } from '../../../../components/FiltersCollection/components/PeriodFilter';
import { SpecialitiesFilter } from '../../../../components/FiltersCollection/components/SpecialitiesFilter';
import LatestNews from '../../../../components/LatestNews';
import { CustomContainer } from '../../../../components/MuiCustom';
import { normalizeString } from '../../../../utilities/functions';

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
                <ControlFilters />
              </>
            </FiltersCollection>
            <Doctors />
          </Stack>
          <Box mt={{ sm: '70px' }}>
            <LatestNews />
          </Box>
        </Stack>
      </CustomContainer>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? 'en',
        ['common', 'doctors', 'departments'],
        null,
        ['ru', 'es', 'de'],
      )),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const specialities = await specialitiesApi().getSpecialities();
  const paths = specialities?.map((speciality) => {
    return {
      params: {
        department: normalizeString(speciality.specialityName, 'lower'),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
};

export default Department;
