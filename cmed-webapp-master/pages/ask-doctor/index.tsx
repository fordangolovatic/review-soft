import { Box, Stack } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageWrapper } from '../../components';
import { QuestionsList } from '../../components/AskDoctor';
import { Breadcrumb } from '../../components/Breadcrumb';
import { FiltersCollection } from '../../components/Departments';
import { LanguagesFilter } from '../../components/FiltersCollection/components/LanguagesFilter';
import { SpecialitiesFilter } from '../../components/FiltersCollection/components/SpecialitiesFilter';
import LatestNews from '../../components/LatestNews';
import { CustomContainer } from '../../components/MuiCustom';

const AskDoctor: NextPage = () => {
  const { t } = useTranslation('questions');
  return (
    <PageWrapper>
      <CustomContainer>
        <Stack>
          <Box my={'35px'}>
            <Breadcrumb />
          </Box>
          <Stack flex={1} spacing={'40px'} direction={'row'}>
            <FiltersCollection
              title={t<string>('filterTitleOne')}
              subtitle={t<string>('filterTitleTwo')}
            >
              <>
                <SpecialitiesFilter />
                <LanguagesFilter />
              </>
            </FiltersCollection>
            <QuestionsList />
          </Stack>
          <Box mt={{ sm: '70px' }}>
            <LatestNews />
          </Box>
        </Stack>
      </CustomContainer>
    </PageWrapper>
  );
};

export default AskDoctor;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || '',
        ['common', 'homePage', 'questions'],
        null,
        ['en'],
      )),
    },
  };
};
