import { Box, Skeleton } from '@mui/material';
import React from 'react';

export const ProfessionalExperiencesSkeleton: React.FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%" py={5}>
      <Skeleton variant="rectangular" animation="wave" width="40%" height={32} />
      <Skeleton variant="rectangular" animation="wave" width="35%" height={16} />
      <Skeleton variant="rectangular" animation="wave" width="50%" height={60} />
      <Skeleton variant="rectangular" animation="wave" width="50%" height={60} />
      <Skeleton variant="rectangular" animation="wave" width="50%" height={60} />
      <Skeleton variant="rectangular" animation="wave" width="50%" height={60} />
    </Box>
  );
};
