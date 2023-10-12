import { MoreHorizOutlined } from '@mui/icons-material';
import { Avatar, Button, Stack, Typography } from '@mui/material';

interface ElementProps {
  name: string;
  role?: string;
  avatar: string;
}

const Element = ({ name, role, avatar }: ElementProps) => {
  return (
    <Stack py={'20px'} direction={'row'} justifyContent={'space-between'}>
      <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
        <Avatar
          srcSet={avatar}
          sx={{ width: { sm: '50px', xl: '75px' }, height: 'auto' }}
        />

        <Stack>
          <Typography variant={'body1'}>{name}</Typography>
          {role && (
            <Typography variant={'body2'} color={'#00534C'}>
              {role}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Stack color={'#00A04A'} direction={'row'} gap={'20px'} alignItems={'center'}>
        <Button
          color={'inherit'}
          variant={'outlined'}
          sx={{ borderRadius: '30px', height: '100%', px: { md: '50px' } }}
        >
          Send Message
        </Button>
        <MoreHorizOutlined sx={{ cursor: 'pointer' }} />
      </Stack>
    </Stack>
  );
};

export default Element;
