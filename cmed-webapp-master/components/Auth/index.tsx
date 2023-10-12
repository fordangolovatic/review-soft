import { Drawer } from '@mui/material';
import React, { FC } from 'react';
import { useGlobalState } from '../../utilities/global-state';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth: FC = () => {
  const { authMethod, setIsAuthMethod } = useGlobalState();

  return (
    <Drawer
      sx={{
        zIndex: '99999',
        '.MuiPaper-root': { maxWidth: { sm: '400px', xl: '600px' }, width: '100%' },
      }}
      anchor={'right'}
      open={authMethod.open}
      onClose={() => setIsAuthMethod({ ...authMethod, open: false })}
    >
      {authMethod.type === 'sign-in' && <SignIn />}
      {authMethod.type === 'sign-up' && <SignUp />}
    </Drawer>
  );
};

export default Auth;
