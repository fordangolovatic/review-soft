import { Avatar, Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';

interface GroupProps {
  name: string;
  userCount: number;
}

export const Group: FC<GroupProps> = ({ name, userCount }) => {
  return (
    <Stack color={'#00534C'} gap={'15px'}>
      <Stack
        width={'100%'}
        direction={'row'}
        gap={'12px'}
        alignItems={'center'}
        color={'#000'}
      >
        <Avatar
          srcSet="/images/works/5.png"
          sx={{ width: { sm: '40px', xl: '60px' }, height: 'auto' }}
        />

        <Stack>
          <Typography variant={'body1'}>{name}</Typography>
          <Typography variant={'body2'} color={'#818181'}>
            {userCount} users
          </Typography>
        </Stack>
      </Stack>

      <Button color={'inherit'} variant={'outlined'} sx={{ borderRadius: '30px' }}>
        Join Team
      </Button>
    </Stack>
  );
};
