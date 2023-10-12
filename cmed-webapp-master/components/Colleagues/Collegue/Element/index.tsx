import { MoreHorizOutlined } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import Dropdown from '../../../Dropdown';

interface ElementProps {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  isRequest?: boolean;
}

const Element: FC<ElementProps> = ({
  name,
  role,
  avatar,
  isRequest,
}: ElementProps) => {
  return (
    <Stack
      py={'20px'}
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
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

      <Dropdown
        options={[
          isRequest ? { label: 'Add to Collagues' } : { label: '' },
          { label: 'Message' },
          { label: 'Block' },
          { label: 'Delete' },
        ]}
      >
        <MoreHorizOutlined color={'inherit'} />
      </Dropdown>
    </Stack>
  );
};

export default Element;
