import { Avatar, Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export interface ContactProps {
  name: string;
  role: string;
}

export const Contact: FC<ContactProps> = ({ name, role }) => {
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
          srcSet="/images/avatar.png"
          sx={{ width: { sm: '40px', xl: '60px' }, height: 'auto' }}
        />

        <Stack>
          <Typography variant={'body1'}>{name}</Typography>
          <Typography variant={'body2'} color={'#818181'}>
            {role}
          </Typography>
        </Stack>
      </Stack>

      <Button color={'inherit'} variant={'outlined'} sx={{ borderRadius: '30px' }}>
        Add contact
      </Button>
    </Stack>
  );
};
