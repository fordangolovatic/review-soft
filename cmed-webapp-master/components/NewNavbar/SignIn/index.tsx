import { Typography } from '@mui/material';
import React from 'react';
import { useGlobalState } from '../../../utilities/global-state';

const SignIn = () => {
  const { setIsAuthMethod } = useGlobalState();
  // const [setAuth] = useAuthStore((state) => [state.setAuth]);
  // const signin = () => setAuth('signin', true, 'signup');
  return (
    <Typography
      onClick={() => {
        setIsAuthMethod({ open: true, type: 'sign-in' });
      }}
      sx={{ '&:hover': { color: '#00A04A' }, cursor: 'pointer' }}
      letterSpacing={'0.04px'}
      variant="body1"
    >
      Sign In
    </Typography>
  );
};

export default SignIn;
