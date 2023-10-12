import { Stack, Typography } from '@mui/material';
import { AccountSummary } from 'aws-sdk/clients/wellarchitected';
import { FC } from 'react';

interface TitleProps {
  title: string;
  author?: AccountSummary;
}

export const Title: FC<TitleProps> = ({ title, author }) => {
  return (
    <Stack spacing={'5px'}>
      <Typography variant={'h5'}>{title}</Typography>
      <Typography color={'disabled'} variant={'body2'}>
        {author?.firstName} {author?.lastName}
      </Typography>
    </Stack>
  );
};
