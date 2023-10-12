import { Box, Stack, styled } from '@mui/material';
import { FC } from 'react';
import { CustomContainer } from '../MuiCustom';
import Logo from './Logo/Logo';
import NavLinks from './NavLinks/NavLinks';
import Utils from './utils';

const AbsoluteNavbar = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  zIndex: '100',
}));

const Navbar: FC = (): JSX.Element => {
  return (
    <AbsoluteNavbar>
      <CustomContainer>
        <Stack
          pt={{ sm: '18px' }}
          direction="row"
          alignItems={'center'}
          justifyContent={{ xs: 'space-between' }}
        >
          <Logo />
          <NavLinks />
          <Utils />
        </Stack>
      </CustomContainer>
    </AbsoluteNavbar>
  );
};

export default Navbar;
