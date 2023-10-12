import { AppBar, Box, Stack, Toolbar } from '@mui/material';
import { FC } from 'react';
import { useAutoRedirect } from '../../api/hooks/auth';
import { CustomContainer } from '../MuiCustom';
import Logo from './Logo/Logo';
import Navigation from './Navigation';

const SocialNavbar: FC = () => {
  useAutoRedirect();

  return (
    <Stack
      justifyContent={'center'}
      height={{ sm: '66px', xl: '100px' }}
      sx={{ backgroundColor: 'white' }}
    >
      <CustomContainer sx={{ height: '100%' }}>
        <AppBar
          sx={{
            backgroundColor: 'white',
            boxShadow: 'none',
            color: 'black',
            height: '100%',
          }}
          position={'static'}
        >
          <Toolbar
            disableGutters
            variant={'dense'}
            sx={{ minHeight: 'fit-content', height: '100%' }}
          >
            <Box mb={{ xl: '12px' }}>
              <Logo />
            </Box>
            <Stack
              sx={{ flexGrow: 1 }}
              alignItems={'center'}
              direction={'row'}
              height={'100%'}
            >
              <Stack
                alignItems={'center'}
                spacing={'5px'}
                ml={'auto'}
                direction={'row'}
                height={'100%'}
                color={'#00534C'}
              >
                <Navigation />
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </CustomContainer>
    </Stack>
  );
};

export default SocialNavbar;
