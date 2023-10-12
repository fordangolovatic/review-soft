import { Box, Button, Card, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { FC } from 'react';

interface MeetingCardProps {
  name: string;
  banner: string;
  userCount?: number;
  date: number;
  startTime: number;
  endTime: number;
}

const MeetingCard: FC<MeetingCardProps> = ({
  name,
  banner,
  userCount,
  date,
  startTime,
  endTime,
}: MeetingCardProps) => {
  return (
    <Card variant={'outlined'} sx={{ width: '100%', padding: '10px' }}>
      <Stack width={'100%'} gap={'18px'}>
        <Box width={'100%'} height={'165px'} position={'relative'}>
          <Image src={banner} alt={name} fill style={{ objectFit: 'cover' }} />
        </Box>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'body1'}>{name}</Typography>
          <Typography variant={'body2'} color={'#818181'}>
            {userCount ?? 'All team'}
          </Typography>
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'body2'}>
            {dayjs(date).format('DD.MM.YYYY')}
          </Typography>

          <Stack direction={'row'}>
            <Typography variant={'body2'}>
              {dayjs(startTime).format('hh:mm')}
            </Typography>
            <Typography variant={'body2'}>-</Typography>
            <Typography variant={'body2'}>
              {dayjs(endTime).format('hh:mm')}
            </Typography>
          </Stack>
        </Stack>

        <Button variant={'contained'} color={'secondary'}>
          Join Meeting
        </Button>
      </Stack>
    </Card>
  );
};

export default MeetingCard;
