import { Stack, useMediaQuery } from '@mui/material';
import { NextPage } from 'next';
import { useAutoRedirect } from '../../../api/hooks/auth';
import Footer from '../../../components/Footer/Footer';
import Contacts from '../../../components/MyTeams/Contacts';
import TeamTabs from '../../../components/MyTeams/TeamTabs';
import { QuickActionsMenu } from '../../../components/QuickActionsMenu';
import SocialNavbar from '../../../components/SocialNavbar';
import useCustomTheme from '../../../utilities/hooks/useTheme';

export const TeamContacts: NextPage = () => {
  useAutoRedirect();
  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack bgcolor={'#F7FBFA'}>
      <SocialNavbar />
      <Stack width={'100%'} direction={'row'} justifyContent={'center'}>
        <Stack
          width={'100%'}
          maxWidth={{ xs: '90%', md: '60%' }}
          pt={{ xs: '26px', xl: '26px', sm: '26px' }}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={'space-evenly'}
          gap={'20px'}
        >
          <TeamTabs />
          <Stack sx={{ width: '100%', height: '100%' }} gap={'20px'}>
            <Contacts />
          </Stack>
        </Stack>
      </Stack>
      {!mobile && <QuickActionsMenu />}
      <Footer />
    </Stack>
  );
};

export default TeamContacts;
