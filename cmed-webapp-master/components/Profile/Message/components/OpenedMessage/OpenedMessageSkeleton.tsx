import {
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';

export const OpenedMessageSkeleton: FC = () => {
  return (
    <Stack mt={'5px'}>
      <ListItem sx={{ p: '10px 0px' }} alignItems="center">
        <ListItemAvatar>
          <Skeleton width={'40px'} height={'40px'} variant={'rounded'} />
        </ListItemAvatar>
        <ListItemText
          sx={{ flex: '0 0 auto', mr: '10px' }}
          secondary={
            <Skeleton variant={'rectangular'} width={'100px'} height={'10px'} />
          }
        />
        <ListItemText
          secondary={
            <Typography variant={'body2'} textAlign={'start'}>
              {<Skeleton variant={'rectangular'} width={'100px'} height={'10px'} />}
            </Typography>
          }
        />
      </ListItem>
      <Divider />
      <Stack mt={'20px'} spacing={'15px'}>
        <Stack spacing={'20px'}>
          <Skeleton variant={'rectangular'} width={'100%'} height={'90px'} />
          <Stack spacing={'5px'} sx={{ width: '100%' }}>
            <Skeleton variant={'rectangular'} width={'100%'} height={'10px'} />
            <Skeleton variant={'rectangular'} width={'60%'} height={'10px'} />
            <Skeleton variant={'rectangular'} width={'80%'} height={'10px'} />
          </Stack>
          <Stack mt={'20px'} spacing={'5px'} sx={{ width: '100%' }}>
            <Skeleton variant={'rectangular'} width={'100%'} height={'40px'} />
            <Skeleton variant={'rectangular'} width={'100%'} height={'40px'} />
            <Skeleton variant={'rectangular'} width={'100%'} height={'40px'} />
          </Stack>
        </Stack>
        <TextField multiline rows={6} sx={{ backgroundColor: '#EFEFEF' }} />
        <Box>
          <Button variant={'contained'} color={'secondary'}>
            Send
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};
