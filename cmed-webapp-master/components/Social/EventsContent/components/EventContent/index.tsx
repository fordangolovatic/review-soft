import { Stack } from '@mui/material';
import { FC } from 'react';
import { Article } from '../../../../../api/types/social-media';
import { EventsLayout } from '../MyEvents/layout';
import { Commentaries, Header } from './components';

interface EventCardProps {
  article: Article;
}

export const EventContent: FC<EventCardProps> = ({ article }) => {
  return (
    <EventsLayout>
      <Stack spacing={'30px'}>
        <Header article={article} />
        <Commentaries comments={3} />
      </Stack>
    </EventsLayout>
  );
};
