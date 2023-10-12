import { Avatar, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';
import { PostUser } from '../../../types';

export interface PostAuthorProps {
  user: PostUser;
  createdAt: Date;
}

const PostAuthor: FC<PostAuthorProps> = ({ user, createdAt }) => {
  return (
    <Stack direction={'row'} gap={'1rem'} alignItems={'center'}>
      <Avatar
        srcSet={user.avatar}
        sx={{ width: { sm: '50px', xl: '75px' }, height: 'auto' }}
      />

      <Stack>
        <Typography variant={'body1'}>{user.name}</Typography>
        <Typography color={'#00534C'} variant={'body2'}>
          {user.role}
        </Typography>
        <Typography color={'#828282'} variant={'body2'}>
          {dayjs(createdAt).format('D MMM YYYY')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PostAuthor;
