import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageWrapper } from '../../../components';
import { DepartmentsCards } from '../../../components/Departments';
import { CustomContainer } from '../../../components/MuiCustom';

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

const Departments: NextPage = () => {
  return (
    <PageWrapper>
      <CustomContainer>
        <DepartmentsCards />
      </CustomContainer>
    </PageWrapper>
  );
};

export default Departments;
