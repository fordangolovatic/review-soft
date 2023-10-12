import { Stack, useMediaQuery } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useAutoRedirect } from '../../../../api/hooks/auth';
import Footer from '../../../../components/Footer/Footer';
import { teams } from '../../../../components/MyTeams/Teams/data';
import TeamDetailsElement from '../../../../components/MyTeams/Teams/Team';
import TeamTabs from '../../../../components/MyTeams/TeamTabs';
import { QuickActionsMenu } from '../../../../components/QuickActionsMenu';
import SocialNavbar from '../../../../components/SocialNavbar';
import useCustomTheme from '../../../../utilities/hooks/useTheme';

const TeamDetails: NextPage = () => {
  useAutoRedirect();

  const router = useRouter();
  const { id } = router.query;
  const currentTeam = teams.find((team) => team.id === id);
  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack bgcolor={'#F7FBFA'}>
      <SocialNavbar />
      <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
        <Stack
          width={'100%'}
          maxWidth={{ xs: '90%', md: '70%' }}
          pt={{ xs: '26px', xl: '26px', sm: '26px' }}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={'space-evenly'}
          gap={'20px'}
        >
          <TeamTabs />
          <Stack sx={{ width: '100%', height: '100%' }} gap={'20px'}>
            {currentTeam && (
              <TeamDetailsElement
                name={currentTeam.name}
                banner={currentTeam.banner}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      {!mobile && <QuickActionsMenu />}
      <Footer />
    </Stack>
  );
};

export default TeamDetails;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || '', ['common'], null, ['en'])),
    },
  };
};
