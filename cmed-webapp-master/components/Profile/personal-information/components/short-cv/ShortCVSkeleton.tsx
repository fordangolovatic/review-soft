import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const ShortCVSkeleton: FC = () => {
  return (
    <Box width="100%" display="flex" flexDirection="column" gap="12px">
      <Box width={'100%'} display="flex" flexDirection="column" gap="2px">
        <Skeleton animation="wave" variant="rectangular" width={'50%'} />
        <Skeleton animation="wave" variant="rectangular" width={'80%'} />
      </Box>

      <Skeleton animation="wave" variant="rectangular" width={'20%'} />
      <Skeleton animation="wave" variant="rectangular" width={'100%'} height={48} />
    </Box>
  );
};

export default ShortCVSkeleton;
