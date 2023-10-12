import { Box, Divider, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import { FC } from 'react';
import { Question } from '../../types';

export const QuestionPage: FC<Question> = ({ title, content }) => {
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
            <Image src={'/images/avatar.png'} alt={'avatar'} fill />
          </Box>
          <Stack spacing={'3px'}>
            <Typography variant={'h5'}>Alex Smith</Typography>
            <Typography sx={{ color: grey[600] }} variant={'body1'}>
              1 day ago
            </Typography>
          </Stack>
        </Stack>
        <Typography variant={'h4'} color={'secondary.dark'}>
          {title}
        </Typography>
        <Typography sx={{ color: grey[600] }} variant={'body1'}>
          {content}
        </Typography>
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
              <Image src={'/images/avatar.png'} alt={'avatar'} fill />
            </Box>
            <Stack spacing={'3px'}>
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
        <Typography variant={'body1'} pl={{ sm: '68px', xl: '80px' }}>
          Not seeing much difference here from the Double Diamond that the author
          critiques. The only difference is that he has added a few steps in between
          which are essentially the glue in between the steps of the Double Diamond.
          Not seeing much difference here from the Double Diamond that the author
          critiques. The only difference is that he has added a few steps in between
          which are essentially the glue in between the steps of the Double Diamond.
        </Typography>
      </Stack>
    </Stack>
  );
};
