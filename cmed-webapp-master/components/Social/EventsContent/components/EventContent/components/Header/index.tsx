import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { FC } from 'react';
import { Article } from '../../../../../../../api/types/social-media';

interface HeaderProps {
  article: Article;
}
export const Header: FC<HeaderProps> = ({ article }) => {
  return (
    <>
      <Box height={'250px'} position={'relative'}>
        <Box right={'10px'} top={'10px'} position={'absolute'} zIndex={2}>
          <Chip
            size={'small'}
            color={article.isPrivate ? 'primary' : 'secondary'}
            label={article.isPrivate ? 'Private Event' : 'Open Event'}
          />
        </Box>
        <Image
          src={
            article.isPrivate ? '/images/events/one.png' : '/images/events/two.png'
          }
          alt={'article'}
          fill
          objectFit={'cover'}
        />
      </Box>
      <Stack flex={1} mt={'10px'} spacing={'3px'}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant={'body1'} color={'secondary'}>
            {article.date}
          </Typography>
          <Typography variant={'body1'}>130 attendees</Typography>
        </Stack>
        <Typography
          noWrap
          sx={{
            textOverflow: 'ellipsis',
          }}
          variant={'h5'}
        >
          {article.title}
        </Typography>
        <Typography>Event organizer: Lexy B</Typography>
        <Box pt={'10px'}>
          <Typography variant={'body2'}>{article.body}</Typography>
        </Box>
        <Stack pt={'15px'} justifyContent={'space-between'} direction={'row'}>
          <Button color={'secondary'} variant={'contained'}>
            Join event
          </Button>
          <Button color={'secondary'} variant={'outlined'}>
            Copy link
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
