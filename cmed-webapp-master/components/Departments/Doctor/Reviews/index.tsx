import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import { Box, Button, Rating, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

const Reviews: FC = () => {
  return (
    <Stack spacing={{ sm: '15px', xl: '20px' }}>
      <Typography variant={'h4'} color={'secondary.dark'}>
        Reviews
      </Typography>
      <Stack spacing={'15px'}>
        {Array.from(Array(3)).map((review, i) => (
          <Stack spacing={'15px'} key={i}>
            <Stack
              spacing={{ sm: '15px', xl: '20px' }}
              direction={'row'}
              justifyContent={'space-between'}
            >
              <Stack direction={'row'} alignItems={'center'}>
                <Box
                  width={{ sm: '40px', xl: '60px' }}
                  height={{ sm: '40px', xl: '60px' }}
                  bgcolor={'gray'}
                  borderRadius={'50px'}
                  mr={'10px'}
                ></Box>
                <Stack>
                  <Typography variant={'h5'}>Alex smith</Typography>
                  <Typography color={'#818181'} variant={'body1'}>
                    1d ago
                  </Typography>
                </Stack>
              </Stack>
              <Stack alignItems={'flex-start'}>
                <Stack
                  sx={{ marginTop: '1px' }}
                  alignItems={'center'}
                  direction={'row'}
                >
                  <Rating
                    icon={<StarRounded fontSize={'small'} />}
                    emptyIcon={<StarBorderRounded fontSize={'small'} />}
                    sx={{ color: 'secondary.dark' }}
                    value={4}
                    readOnly
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack pl={{ sm: '50px', xl: '70px' }}>
              <Typography color={'#2B3239'}>
                Not seeing much difference here from the Double Diamond that the
                author critiques. The only difference is that he has added a few
                steps in between which are essentially the glue in between the steps
                of the Double Diamond.{' '}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack pt={'30px'} direction={'row'}>
        {Array.from(Array(5)).map((page, i) => (
          <Button
            key={i}
            sx={{
              borderRadius: '50px',
              padding: '0px',
              width: '32',
              height: '32px',
              minWidth: '32px',
            }}
            variant={i === 0 ? 'contained' : 'text'}
            color={'secondary'}
          >
            {i + 1}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Reviews;
