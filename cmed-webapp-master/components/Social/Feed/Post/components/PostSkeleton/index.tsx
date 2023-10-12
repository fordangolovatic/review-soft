import { Box, Card, Divider, Skeleton } from '@mui/material';
import { FC } from 'react';

const PostSkeleton: FC = () => {
  return (
    <Card variant="outlined">
      <Box display="flex" flexDirection={'column'} gap={1} p={'20px'}>
        <Box width={'100%'} display="flex" gap={'1rem'}>
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{
              flexShrink: 0,
              width: { sm: 50, xl: 75 },
              height: { sm: 50, xl: 75 },
            }}
          />
          <Box width={'100%'} display="flex" gap={'2px'} flexDirection={'column'}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="30%"
              sx={{ height: { sm: 14, xl: 20 } }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="15%"
              sx={{ height: { sm: 14, xl: 16 } }}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="20%"
              sx={{ height: { sm: 14, xl: 16 } }}
            />
          </Box>
        </Box>

        <Box width={'100%'} display="flex" gap={'4px'} flexDirection="column">
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={16}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={16}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={16}
          />
        </Box>

        <Box width={'100%'} display="flex" gap={'40px'} flexDirection="row">
          <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
          <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
          <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
        </Box>
      </Box>
      <Divider orientation={'horizontal'} color={'#000'} />

      <Box
        display="flex"
        flexDirection="row"
        justifyContent={'space-around'}
        py={'20px'}
      >
        <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
        <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
        <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
        <Skeleton variant="rectangular" animation="wave" width="15%" height={20} />
      </Box>
    </Card>
  );
};

export default PostSkeleton;
