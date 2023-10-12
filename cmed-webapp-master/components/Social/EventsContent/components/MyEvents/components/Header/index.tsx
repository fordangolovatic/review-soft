import { Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';

export const Header: FC = () => {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
      <Typography variant={'h4'}>Event</Typography>
      <Stack spacing={{ sm: '15px', xl: '20px' }} direction={'row'}>
        <Button
          sx={{ borderRadius: '50px', padding: '20px 30px' }}
          variant={'outlined'}
          color={'secondary'}
        >
          Add event
        </Button>
      </Stack>
    </Stack>
  );
};
