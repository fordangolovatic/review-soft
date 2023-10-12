import { Box, Divider, Skeleton } from '@mui/material';
import { FC } from 'react';

const DoctorSkeleton: FC = () => {
  return (
    <Box>
      {Array.from(Array(10)).map((_, index) => (
        <Box key={index} mt={{ sm: '20px' }}>
          <Box display="flex" flexDirection="row" gap={1} width="100%">
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                minWidth: { sm: '158px', xl: '238px' },
                height: { sm: '158px', xl: '238px' },
              }}
            />
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              width="100%"
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="column" gap={1} width="100%">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="40%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="35%"
                  height={20}
                />
              </Box>

              <Box display="flex" flexDirection="column" gap={1} width="100%">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="30%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="30%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="30%"
                  height={20}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              minWidth="max-content"
              width="35%"
              alignItems="flex-end"
              justifyContent="space-between"
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="70%"
                height={20}
              />

              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                width="100%"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="50%"
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="50%"
                  height={20}
                />

                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={30}
                />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ marginTop: { sm: '20px' } }} flexItem />
        </Box>
      ))}
    </Box>
  );
};

export default DoctorSkeleton;
