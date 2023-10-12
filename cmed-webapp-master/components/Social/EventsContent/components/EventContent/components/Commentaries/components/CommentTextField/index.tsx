import { Avatar, Icon, Stack, TextField } from '@mui/material';
import React, { FC } from 'react';
import { SendMessageIcon } from '../../../../../../../../../utilities/icons/all';

export const CommentTextField: FC = () => {
  return (
    <Stack direction={'row'} spacing={'16px'} alignItems={'center'}>
      <Avatar
        sx={{
          width: '50px',
          height: '50px',
        }}
        src={'/images/avatar.png'}
        alt={'Eduard'}
      />
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
              <Icon color={'secondary'}>
                <SendMessageIcon />
              </Icon>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
};
