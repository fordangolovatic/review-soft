import { Box, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
import Footer from '../../../Footer/Footer';
import { CustomContainer } from '../../../MuiCustom';
import SocialNavbar from '../../../SocialNavbar';

interface SocialLayoutProps {
  children: ReactNode;
}
export const SocialLayout: FC<SocialLayoutProps> = ({ children }) => {
  return (
    <Stack minHeight={'100vh'} bgcolor={'#F7FBFA'}>
      <SocialNavbar />
      <Box flexGrow={1}>
        <CustomContainer>{children}</CustomContainer>
      </Box>
      <Box bgcolor={'background.paper'}>
        <Footer />
      </Box>
    </Stack>
  );
};
