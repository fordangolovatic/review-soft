import { Stack } from '@mui/material';
import { FC } from 'react';
import { EventCalendar, Header, RecomendationEvents } from './components';

export const MyEvents: FC = () => {
  return (
    <Stack spacing={{ sm: '30px', xl: '40px' }}>
      <Header />
      <EventCalendar />
      <RecomendationEvents />
    </Stack>
  );
};
