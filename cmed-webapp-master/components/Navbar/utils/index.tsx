import { Box, Stack, styled, Typography, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';
import { useAutoRedirect } from '../../../api/hooks/auth';
import { useGlobalState } from '../../../utilities/global-state';
import useCustomTheme from '../../../utilities/hooks/useTheme';
import { Icons } from '../../../utilities/icons';
import WalletSystemNavbar from '../../WalletSystemNavbar';
import Language from '../Language/Language';
import { ProfileMenu } from '../Profile';

const ResponsiveBox = styled(Box)(() => ({}));

const Utils: FC = () => {
  useAutoRedirect();

  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { setIsAuthMethod } = useGlobalState();

  const { isLoggedIn } = useGlobalState();

  return (
    <ResponsiveBox ml={{ xl: '30px', sm: '20px' }}>
      <Stack
        alignItems={'center'}
        sx={{
          gap: { xl: '20px', xs: '12px' },
        }}
        direction="row"
      >
        {!mobile && !isLoggedIn && (
          <Typography
            onClick={() => {
              setIsAuthMethod({ open: true, type: 'sign-in' });
            }}
            sx={{ '&:hover': { color: '#00A04A' }, cursor: 'pointer' }}
            letterSpacing={'0.04px'}
            variant="body1"
            id={'sign-in'}
          >
            Sign In
          </Typography>
        )}
        {isLoggedIn && (
          <Stack
            alignItems={'center'}
            spacing={'15px'}
            direction={'row'}
            sx={{
              position: 'relative',
              bottom: '-2px',
            }}
            display={{ xs: 'none', sm: 'flex' }}
            ml={{ sm: '10px', xl: '15px' }}
            justifyContent={'flex-end'}
          >
            <WalletSystemNavbar />
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <ProfileMenu />
            </Box>
          </Stack>
        )}
        <Box width={50}>
          <Language />
        </Box>
        {mobile && (
          <Box ml={'13px'}>
            <Icons.BurgerMenu />
          </Box>
        )}
      </Stack>
    </ResponsiveBox>
  );
};

export default Utils;
