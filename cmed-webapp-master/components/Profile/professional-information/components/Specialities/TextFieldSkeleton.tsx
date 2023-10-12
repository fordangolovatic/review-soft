import { Box, Skeleton } from '@mui/material';
import React from 'react';

export const TextFieldSkeleton: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%" pt={1}>
      <Skeleton variant="rectangular" animation="wave" width="35%" height={16} />
      <Skeleton variant="rectangular" animation="wave" width="70%" height={40} />
    </Box>
  );
};
