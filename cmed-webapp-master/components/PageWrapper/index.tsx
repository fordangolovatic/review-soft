import { Box, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';
import useCustomTheme from '../../utilities/hooks/useTheme';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { QuickActionsMenu } from '../QuickActionsMenu';

export interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  const { theme } = useCustomTheme();

  const isSmallView = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      className={'content'}
      sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      {!isSmallView && <QuickActionsMenu />}
      <Navbar />
      <Box pt={{ xl: '69px', sm: '44px', xs: '44px' }}>{children}</Box>
      <Footer />
    </Box>
  );
};
