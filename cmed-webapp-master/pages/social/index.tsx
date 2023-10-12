import { Stack, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useCallback } from 'react';
import { useAutoRedirect } from '../../api/hooks/auth';
import { useMetadataQuery } from '../../api/hooks/metadata';
import Footer from '../../components/Footer/Footer';
import { QuickActionsMenu } from '../../components/QuickActionsMenu';
import Feed from '../../components/Social/Feed';
import NewPost from '../../components/Social/Feed/NewPost';
import Sort from '../../components/Social/Feed/Sort';
import SocialProfile from '../../components/Social/Profile';
import { MobileRecommendation } from '../../components/Social/Recomendation/components';
import SocialNavbar from '../../components/SocialNavbar';
import { useGlobalState } from '../../utilities/global-state';
import useCustomTheme from '../../utilities/hooks/useTheme';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common'], null, ['en'])),
    },
  };
};

const Social: NextPage = () => {
  useAutoRedirect();
  const { t } = useTranslation('common');

  const { data: profile, isLoading: isProfileLoading } = useMetadataQuery();
  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isLoggedIn } = useGlobalState();

  const handleSortChange = useCallback((newSort: string) => {
    // Need to implement the method to sort the data
    return newSort;
  }, []);

  return (
    <Stack bgcolor={'#F7FBFA'}>
      <SocialNavbar />
      <Box px={2} pt={2}>
        <Typography variant="body1">{t('socialIntro')}</Typography>
      </Box>
      <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
        <Stack
          width={'100%'}
          maxWidth={{ xs: '100%', md: '60%' }}
          pt={{ xs: '26px', xl: '26px', sm: '26px' }}
          direction={'row'}
          // justifyContent={'space-evenly'}
          gap={'20px'}
        >
          <SocialProfile
            isLogged={isLoggedIn}
            profileData={profile}
            isLoading={isProfileLoading}
          />
          <Stack
            sx={{ width: { xs: '90%', md: '50%' }, height: '100%' }}
            gap={'20px'}
          >
            <NewPost profileData={profile} isLoading={isProfileLoading} />
            <Sort options={['Related']} onSelect={handleSortChange} />
            {mobile && <MobileRecommendation />}

            <Feed />
          </Stack>
          {/* <Stack gap={'25px'} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Recommendation />
            <RecommendationAd />
          </Stack> */}
        </Stack>
      </Stack>
      {!mobile && <QuickActionsMenu />}
      <Footer />
    </Stack>
  );
};

export default Social;
