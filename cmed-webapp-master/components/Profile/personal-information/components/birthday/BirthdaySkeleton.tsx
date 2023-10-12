import { Box, Skeleton } from '@mui/material';
import React from 'react';

export const BirthdaySkeleton: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%" pt={1}>
      <Skeleton variant="rectangular" animation="wave" width="40%" height={32} />
      <Skeleton variant="rectangular" animation="wave" width="35%" height={16} />
      <Box display="flex" justifyContent="space-between" width="100%" pt={1.5}>
        <Skeleton variant="rectangular" animation="wave" width="30%" height={40} />
        <Skeleton variant="rectangular" animation="wave" width="30%" height={40} />
        <Skeleton variant="rectangular" animation="wave" width="30%" height={40} />
      </Box>
    </Box>
  );
};
