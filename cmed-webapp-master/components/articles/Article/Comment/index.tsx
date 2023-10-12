import { Box, Icon, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import React, { FC } from 'react';
import { LikeIcon } from '../../../../utilities/icons/all';

export const Comment: FC = () => {
  return (
    <Stack spacing={'20px'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack spacing={'17px'} direction={'row'} alignItems={'center'}>
          <Box
            sx={{
              width: { sm: '48px', xl: '60px' },
              height: { sm: '48px', xl: '60px' },
              position: 'relative',
              borderRadius: '50px',
              overflow: 'hidden',
            }}
          >
            <Image src={'/images/avatar.png'} alt={'avatar'} fill />
          </Box>
          <Stack>
            <Typography variant={'h5'}>Alex Smith</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              1 day ago
            </Typography>
          </Stack>
        </Stack>
        <Typography color={'secondary'} variant={'body1'}>
          Neurologist
        </Typography>
      </Stack>
      <Stack spacing={'20px'} pl={{ sm: '65px', xl: '77px' }}>
        <Typography variant={'body1'}>
          Not seeing much difference here from the Double Diamond that the author
          critiques. The only difference is that he has added a few steps in between
          which are essentially the glue in between the steps of the Double Diamond.
        </Typography>
        <Stack spacing={'25px'} alignItems={'flex-end'} direction={'row'}>
          <Typography sx={{ color: grey[600] }} variant={'body1'}>
            Reply
          </Typography>
          <Stack spacing={'8px'} direction={'row'} alignItems={'flex-end'}>
            <Icon sx={{ color: grey[600] }}>
              <LikeIcon />
            </Icon>
            <Typography sx={{ color: grey[600] }}>12 Likes</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
