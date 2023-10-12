import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { Article } from '../../../../../../../api/types/social-media';

interface EventCardProps {
  article: Article;
  link?: string;
}

export const EventCard: FC<EventCardProps> = ({ article, link }) => {
  return (
    <Box
      sx={{
        border: '1px solid #EFEFEF',
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
      pb={'10px'}
      overflow={'hidden'}
    >
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
      <Stack mt={'10px'} px={'15px'} spacing={'3px'}>
        <Typography
          noWrap
          sx={{
            textOverflow: 'ellipsis',
          }}
          variant={'h5'}
        >
          {article.title}
        </Typography>
        <Typography variant={'body1'} color={'secondary'}>
          {article.date}
        </Typography>
        <Box pt={'10px'}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '4',
              WebkitBoxOrient: 'vertical',
            }}
            variant={'body2'}
          >
            {article.body}
          </Typography>
        </Box>
        <Stack pt={'15px'} justifyContent={'space-between'} direction={'row'}>
          {link ? (
            <Button color={'secondary'} variant={'outlined'}>
              Copy link
            </Button>
          ) : (
            <Button color={'darkGreen'} variant={'contained'}>
              Learn more
            </Button>
          )}
          <Button
            color={article.isPrivate ? 'primary' : 'secondary'}
            variant={'contained'}
          >
            {article.isPrivate ? 'Reject' : 'Join Event'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
