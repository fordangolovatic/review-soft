import { Avatar, Box, Button, Card, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import Comment from '../Comment';
import MeetingCard from '../MeetingCard';
import { comments } from './../data';

interface TeamDetailsElementProps {
  name: string;
  banner: string;
}

const TeamDetailsElement: FC<TeamDetailsElementProps> = ({
  name,
  banner,
}: TeamDetailsElementProps) => {
  return (
    <Card variant={'outlined'}>
      <Stack padding={'20px'} gap={'20px'}>
        <Box height={'250px'} position={'relative'}>
          <Image src={banner} alt={name} fill style={{ objectFit: 'cover' }} />
        </Box>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'subtitle1'}>{name}</Typography>

          <Button variant={'contained'} color={'darkGreen'}>
            Edit
          </Button>
        </Stack>

        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Stack direction={'row'} gap={'1rem'} alignItems={'center'}>
            <Avatar
              srcSet={'/images/doctorCard.png'}
              sx={{ width: { sm: '50px', xl: '75px' }, height: 'auto' }}
            />

            <Stack>
              <Typography variant={'body1'}>Inna Tovbina</Typography>
              <Typography color={'#00534C'} variant={'body2'}>
                Creator
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} gap={'1rem'} alignItems={'center'}>
            <Avatar
              srcSet={'/images/avatar.png'}
              sx={{ width: { sm: '50px', xl: '75px' }, height: 'auto' }}
            />

            <Stack>
              <Typography variant={'body1'}>Inna Tovbina</Typography>
              <Typography color={'#00534C'} variant={'body2'}>
                Manager
              </Typography>
            </Stack>
          </Stack>
          <Stack direction={'row'} gap={'1rem'} alignItems={'center'}>
            <Avatar
              srcSet={'/images/avatar.png'}
              sx={{ width: { sm: '50px', xl: '75px' }, height: 'auto' }}
            />

            <Stack>
              <Typography variant={'body1'}>Inna Tovbina</Typography>
              <Typography color={'#00534C'} variant={'body2'}>
                Manager
              </Typography>
            </Stack>
          </Stack>

          <Typography color={'#00534C'} borderBottom={'1px solid #00534C'}>
            and 23 users
          </Typography>
        </Stack>

        <Stack
          color={'#00A04A'}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'body1'} color={'#000'}>
            Meeting with Team 1
          </Typography>
          <Button
            color={'inherit'}
            variant={'outlined'}
            sx={{ borderRadius: '30px', height: '100%' }}
          >
            Add team
          </Button>
        </Stack>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={'space-between'}
          gap={'6px'}
        >
          <MeetingCard
            name={'Emergency Squad'}
            banner={'/images/departments-mti.png'}
            date={Date.parse('2022-12-30T22:00:00.000Z')}
            startTime={Date.parse('2022-12-30T22:00:00.000Z')}
            endTime={Date.parse('2022-12-30T22:00:00.000Z')}
          />
          <MeetingCard
            name={'Emergency Squad'}
            banner={'/images/departments-mti.png'}
            date={Date.parse('2022-12-30T22:00:00.000Z')}
            startTime={Date.parse('2022-12-30T22:00:00.000Z')}
            endTime={Date.parse('2022-12-30T22:00:00.000Z')}
          />
          <MeetingCard
            name={'Emergency Squad'}
            banner={'/images/departments-mti.png'}
            date={Date.parse('2022-12-30T22:00:00.000Z')}
            startTime={Date.parse('2022-12-30T22:00:00.000Z')}
            endTime={Date.parse('2022-12-30T22:00:00.000Z')}
          />
        </Stack>

        <Stack gap={'30px'}>
          <Typography variant={'body1'}>Comments</Typography>

          <Stack gap={'60px'}>
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                name={comment.name}
                role={comment.role}
                avatar={comment.avatar}
                content={comment.content}
                createdAt={new Date()}
                likes={comment.likes}
                replies={comment.replies}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TeamDetailsElement;
