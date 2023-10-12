import { Box, Button, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';

interface EventProps {
  name: string;
  date: string | Date;
  joinedCount: number;
}

export const Event: FC<EventProps> = ({ name, date, joinedCount }) => {
  return (
    <Stack color={'#00534C'} gap={'15px'}>
      <Stack width={'100%'} gap={'18px'} alignItems={'center'} color={'#000'}>
        <Box width={'100%'} height={'100px'} position={'relative'}>
          <Image
            src={'/images/articles/article1.png'}
            alt={`${name} event`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        <Stack width={'100%'}>
          <Typography variant={'body1'}>{name}</Typography>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant={'body2'} color={'#818181'}>
              {dayjs(date).format('D MMM YYYY')}
            </Typography>
            <Typography variant={'body2'} color={'#818181'}>
              {joinedCount} users
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Button color={'inherit'} variant={'outlined'} sx={{ borderRadius: '30px' }}>
        Join Event
      </Button>
    </Stack>
  );
};
