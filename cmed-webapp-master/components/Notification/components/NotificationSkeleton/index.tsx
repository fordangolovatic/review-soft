import { Box, Divider, Skeleton, Stack } from '@mui/material';
import { FC } from 'react';

const NotificationSkeleton: FC = () => {
  return (
    <Stack
      gap={'20px'}
      divider={<Divider orientation="horizontal" color={'#EFEFEF'} />}
    >
      {Array.from(Array(5)).map((_, index) => (
        <Box
          key={index}
          width="100%"
          display="flex"
          flexDirection="column"
          gap={'20px'}
        >
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            gap={2}
          >
            {/* Temporary disabling the banner until BE implementation */}
            {/* <Skeleton
          animation="wave"
          variant="rectangular"
          width="65px"
          height="65px"
          sx={{ flexShrink: 0 }}
        /> */}

            <Box width="100%" display="flex" flexDirection="column" gap="2px">
              <Skeleton animation="wave" variant="rectangular" width="150px" />
              {/* <Skeleton animation="wave" variant="rectangular" width="35%" /> */}
            </Box>
          </Box>

          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            gap="12px"
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="30%"
              height="32px"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="30%"
              height="32px"
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

export default NotificationSkeleton;
