import { Stack } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Footer from '../../components/Footer/Footer';
import { CustomContainer } from '../../components/MuiCustom';
import NewNavbar from '../../components/NewNavbar';
import Content from '../../components/Profile/Content';
import { Sidebar } from '../../components/Profile/Sidebar';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common', 'profile'], null, [
        'en',
      ])),
    },
  };
};

const Profile: NextPage = () => {
  return (
    <Stack bgcolor={'#F9F9F9'}>
      <NewNavbar />
      <CustomContainer>
        <Stack pt={{ xl: '26px', sm: '26px' }} direction={'row'} spacing={'13px'}>
          <Sidebar />
          <Content />
        </Stack>
      </CustomContainer>
      <Footer />
    </Stack>
  );
};

export default Profile;
