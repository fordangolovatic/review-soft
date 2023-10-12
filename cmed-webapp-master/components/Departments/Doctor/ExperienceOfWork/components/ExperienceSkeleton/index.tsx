import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const ExperienceSkeleton: FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width="70%" pt={1}>
      <Skeleton variant="rectangular" animation="wave" width="40%" height={32} />
      <Box display="flex" width="100%" pt={1} justifyContent="space-between">
        <Box display="flex" width="100%" alignItems="flex-start">
          <Skeleton variant="rectangular" animation="wave" width="15%" height={16} />
        </Box>
        <Box display="flex" width="100%" alignItems="flex-start">
          <Skeleton variant="rectangular" animation="wave" width="15%" height={16} />
        </Box>
        <Box display="flex" width="100%" alignItems="flex-start">
          <Skeleton variant="rectangular" animation="wave" width="15%" height={16} />
        </Box>
      </Box>

      {Array.from(Array(5)).map((_, index) => (
        <Box
          key={index}
          display="flex"
          width="100%"
          pt={2}
          justifyContent="space-between"
        >
          <Box display="flex" width="100%" alignItems="flex-start">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="90%"
              height={16}
            />
          </Box>
          <Box display="flex" width="100%" alignItems="flex-start">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="90%"
              height={16}
            />
          </Box>
          <Box display="flex" width="100%" alignItems="flex-start">
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="90%"
              height={16}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ExperienceSkeleton;
