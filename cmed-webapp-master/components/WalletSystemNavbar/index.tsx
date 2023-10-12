import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { WalletIcon } from '../../utilities/icons/navbar';

const WalletSystemNavbar = () => {
  return (
    <Stack
      sx={{ cursor: 'pointer' }}
      spacing={'8px'}
      direction={'row'}
      alignItems={'center'}
    >
      <Box width={'24px'} height={'24px'}>
        <WalletIcon />
      </Box>
      <Typography color={'secondary'} variant={'body1'}>
        $0
      </Typography>
    </Stack>
  );
};

export default WalletSystemNavbar;
