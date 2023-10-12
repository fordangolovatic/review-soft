import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const ArticleSkeleton: FC = () => {
  return (
    <Box display="flex" flexDirection="column" gap={1} width="100%" pt={1}>
      <Skeleton variant="rectangular" animation="wave" width="30%" height={32} />

      {Array.from(Array(5)).map((_, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="column"
          width="100%"
          pt={2}
          gap={1}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDirection="row"
            width="100%"
            justifyContent="space-between"
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="10%"
              height={16}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="15%"
              height={16}
            />
          </Box>

          <Skeleton variant="rectangular" animation="wave" width="30%" height={16} />
        </Box>
      ))}
    </Box>
  );
};

export default ArticleSkeleton;
