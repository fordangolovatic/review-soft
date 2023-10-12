import { Box, Card, Skeleton } from '@mui/material';
import { FC } from 'react';

const ProfileSkeleton: FC = () => {
  return (
    <Box
      sx={{
        width: 'max-content',
        height: 'max-content',
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          padding: '20px',
          height: 'max-content',
          display: 'flex',
        }}
      >
        <Box width="100%" display="flex" flexDirection="column" gap="20px">
          <Box width="100%" display="flex" gap="12px" alignItems="center">
            <Skeleton
              animation="wave"
              variant="circular"
              sx={{
                width: { sm: 40, xl: 60 },
                height: { sm: 40, xl: 60 },
                flexShrink: 0,
              }}
            />

            <Box width="100%" display="flex" flexDirection="column" gap={'4px'}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                sx={{ height: { sm: 16, xl: 20 } }}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="40%"
                sx={{ height: { sm: 16, xl: 20 } }}
              />
            </Box>
          </Box>

          <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{ width: { sm: 163.6, xl: 217.45 }, height: { sm: 24, xl: 25 } }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="80%"
            sx={{ height: { sm: 24, xl: 25 } }}
          />

          <Box width="100%" display="flex" justifyContent="flex-end">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="20%"
              sx={{ height: { sm: 18, xl: 25 } }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ProfileSkeleton;
