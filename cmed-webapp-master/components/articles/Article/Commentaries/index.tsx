import { ArrowDropDown } from '@mui/icons-material';
import { Box, Button, Icon, Stack, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import Image from 'next/image';
import React, { FC } from 'react';
import { SendMessageIcon } from '../../../../utilities/icons/all';
import { Comment } from '../Comment';

interface CommentariesProps {
  commentsCount: number;
}

export const Commentaries: FC<CommentariesProps> = ({ commentsCount }) => {
  return (
    <Stack spacing={'30px'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant={'h4'} sx={{ color: grey[600] }}>
          {`Comments ${commentsCount}`}
        </Typography>
        <Stack direction={'row'} alignItems={'flex-start'}>
          <Typography variant={'body1'}>Rating</Typography>
          <Icon>
            <ArrowDropDown />
          </Icon>
        </Stack>
      </Stack>
      <Stack direction={'row'} spacing={'20px'} alignItems={'center'}>
        <Box
          borderRadius={'50px'}
          overflow={'hidden'}
          position={'relative'}
          minWidth={'80px'}
          height={'80px'}
        >
          <Image src={'/images/avatar.png'} alt={'avatar'} fill />
        </Box>
        <Stack
          width={'100%'}
          alignItems={'center'}
          direction={'row'}
          bgcolor={'#EFEFEF'}
        >
          <TextField
            sx={{ border: 'none' }}
            fullWidth
            placeholder={'Write a comment'}
            InputProps={{
              endAdornment: (
                <Icon>
                  <SendMessageIcon />
                </Icon>
              ),
            }}
          />
        </Stack>
      </Stack>
      <Stack>
        <Comment />
      </Stack>
      <Box>
        <Button color={'primary'} variant={'outlined'}>
          Show more comments
        </Button>
      </Box>
    </Stack>
  );
};
