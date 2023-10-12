import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const MtiSkeleton: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      width="100%"
      height="100%"
      pt={1}
      justifyContent="space-between"
    >
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        sx={{
          width: { sm: '100%', xl: '100%' },
          height: { sm: 'auto', md: '100%' },
        }}
        gap={1}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={'100%'}
          height={230}
        />

        <Skeleton variant="rectangular" animation="wave" width="80%" height={20} />
        <Skeleton variant="rectangular" animation="wave" width="60%" height={20} />

        <Skeleton variant="rectangular" animation="wave" width="60%" height={18} />
        <Skeleton variant="rectangular" animation="wave" width="60%" height={18} />
        <Skeleton variant="rectangular" animation="wave" width="60%" height={18} />
        <Skeleton variant="rectangular" animation="wave" width="60%" height={18} />
      </Box>

      <Box display="flex" flexDirection="column" gap={1} alignItems="center">
        <Skeleton variant="rectangular" animation="wave" width="65%" height={20} />
        <Skeleton variant="rectangular" animation="wave" width="35%" height={20} />
        <Skeleton variant="rectangular" animation="wave" width="100%" height={35} />
      </Box>
    </Box>
  );
};

export default MtiSkeleton;
