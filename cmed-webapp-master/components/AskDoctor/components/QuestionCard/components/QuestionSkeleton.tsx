import { Box, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const QuestionSkeleton: FC = () => {
  return (
    <Stack>
      <Stack spacing={'15px'}>
        <Stack alignItems={'center'} spacing={'20px'} direction={'row'}>
          <Box
            borderRadius={'50px'}
            overflow={'hidden'}
            position={'relative'}
            width={{ sm: '48px', xl: '60px' }}
            height={{ sm: '48px', xl: '60px' }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'100%'}
              height={'100%'}
            />
          </Box>
          <Stack spacing={'3px'}>
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'100px'}
              height={'10px'}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'40px'}
              height={'10px'}
            />
          </Stack>
        </Stack>
        <Stack spacing={'3px'}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'300px'}
            height={'10px'}
          />
        </Stack>
        <Stack spacing={'3px'}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'100%'}
            height={'10px'}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'40%'}
            height={'10px'}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'100%'}
            height={'10px'}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'60%'}
            height={'10px'}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'900%'}
            height={'10px'}
          />
        </Stack>
      </Stack>
      <Divider sx={{ margin: '20px 0' }} />
      <Stack spacing={'15px'}>
        <Typography variant={'h4'}>Doctor &#39;s recommendation</Typography>
        <Stack
          justifyContent={'space-between'}
          direction={'row'}
          alignItems={'center'}
        >
          <Stack alignItems={'center'} spacing={'20px'} direction={'row'}>
            <Box
              borderRadius={'50px'}
              overflow={'hidden'}
              position={'relative'}
              width={{ sm: '48px', xl: '60px' }}
              height={{ sm: '48px', xl: '60px' }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={'100%'}
                height={'100%'}
              />
            </Box>
            <Stack spacing={'3px'}>
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={'100px'}
                height={'10px'}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={'40px'}
                height={'10px'}
              />
            </Stack>
          </Stack>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'40px'}
            height={'10px'}
          />
        </Stack>
        <Stack spacing={'3px'}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'40%'}
            height={'10px'}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'30%'}
            height={'10px'}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'60%'}
            height={'10px'}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
