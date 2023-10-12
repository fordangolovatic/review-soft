import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

interface ShortCVProps {
  content?: string;
}

const ShortCV: FC<ShortCVProps> = ({ content }) => {
  return (
    <Stack spacing={{ sm: '15px', xl: '20px' }}>
      <Typography variant={'h4'} color={'secondary.dark'}>
        Short CV
      </Typography>
      <Typography variant={'body1'} color={content ? 'inherit' : '#818181'}>
        {content ?? 'No description available'}
      </Typography>
    </Stack>
  );
};

export default ShortCV;
