import { Box, Divider, Skeleton } from '@mui/material';
import React from 'react';

export const SidebarSkeleton: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      width="100%"
      pt={1}
    >
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Box width="90%">
        <Divider />
      </Box>
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Box width="90%">
        <Divider />
      </Box>
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Skeleton variant="rectangular" animation="wave" width="90%" height={24} />
      <Divider />
    </Box>
  );
};
