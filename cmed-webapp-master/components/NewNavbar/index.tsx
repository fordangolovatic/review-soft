import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { FC } from 'react';
import { useAutoRedirect } from '../../api/hooks/auth';
import { useGlobalState } from '../../utilities/global-state';
import { WalletSystemNavbar } from '../index';
import { CustomContainer } from '../MuiCustom';
import Language from '../Navbar/Language/Language';
import Notification from '../Notification';
import Logo from './Logo/Logo';
import NavNotification from './Notification';
import Profile from './Profile';
import SearchInput from './Search';
import SignIn from './SignIn';

const NewNavbar: FC = () => {
  useAutoRedirect();

  const { isLoggedIn } = useGlobalState();

  return (
    <Stack
      justifyContent={'center'}
      height={{ sm: '66px', xl: '100px' }}
      sx={{ flexGrow: 1, backgroundColor: 'white' }}
    >
      <CustomContainer>
        <AppBar
          sx={{
            backgroundColor: 'white',
            boxShadow: 'none',
            color: 'black',
          }}
          position={'static'}
        >
          <Toolbar
            disableGutters
            variant={'dense'}
            sx={{ minHeight: 'fit-content' }}
          >
            <Box mb={{ xl: '12px' }}>
              <Logo />
            </Box>
            <Stack sx={{ flexGrow: 1 }} alignItems={'center'} direction={'row'}>
              <SearchInput disabled />
              <Notification>
                <NavNotification />
              </Notification>
              <Stack
                alignItems={'center'}
                spacing={'5px'}
                ml={'auto'}
                direction={'row'}
              >
                {!isLoggedIn && <SignIn />}
                {isLoggedIn && <WalletSystemNavbar />}
                {isLoggedIn && <Profile />}
                <Language />
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </CustomContainer>
    </Stack>
  );
};

export default NewNavbar;
