import { Box, Skeleton } from '@mui/material';
import { FC } from 'react';

const AskSkeleton: FC = () => {
  return (
    <Box display="flex" flexDirection="column">
      {Array.from(Array(10)).map((_, index) => (
        <Box key={index} display="flex" flexDirection="column" gap="15px">
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            gap="15px"
            justifyContent="space-between"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="15%"
                height={24}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="20%"
                height={24}
              />
            </Box>

            <Box display="flex" flexDirection="column" gap="5px">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="30%"
                height={18}
              />
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="20%"
                height={18}
              />
            </Box>

            <Skeleton
              animation="wave"
              variant="rectangular"
              width="60%"
              height={18}
            />

            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="10px"
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="25%"
                  height={18}
                />
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="25%"
                  height={18}
                />
              </Box>

              <Skeleton
                animation="wave"
                variant="rectangular"
                width="20%"
                height={30}
              />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default AskSkeleton;
