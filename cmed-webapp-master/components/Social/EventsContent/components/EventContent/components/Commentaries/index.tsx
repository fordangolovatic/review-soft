import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';
import { Comment, CommentTextField } from './components';

interface CommentariesProps {
  comments: number;
}
export const Commentaries: FC<CommentariesProps> = ({ comments }) => {
  return (
    <Stack spacing={'30px'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Typography variant={'subtitle1'} sx={{ color: grey[600] }}>
          {`Comments ${comments}`}
        </Typography>
      </Stack>
      <Stack spacing={'30px'}>
        {Array.from(Array(comments)).map((index) => (
          <Comment key={index} />
        ))}
      </Stack>
      <CommentTextField />
    </Stack>
  );
};
