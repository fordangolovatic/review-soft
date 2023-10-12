import { Typography } from '@mui/material';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageWrapper } from '../../components';
import { CustomContainer } from '../../components/MuiCustom';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['homePage', 'common'], null, [
        'en',
      ])),
    },
  };
};

const About: NextPage = () => {
  const { t } = useTranslation('homePage');

  return (
    <PageWrapper>
      <CustomContainer sx={{ height: '500px', paddingTop: 10 }}>
        <Typography sx={{ whiteSpace: 'pre-wrap' }}> {t('about')}</Typography>
      </CustomContainer>
    </PageWrapper>
  );
};

export default About;
