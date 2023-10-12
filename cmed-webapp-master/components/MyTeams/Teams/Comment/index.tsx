import { ShortcutOutlined, ThumbUpOutlined } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';

interface CommentProps {
  avatar: string;
  name: string;
  content: string;
  role: string;
  createdAt: Date;
  replies: Array<any>;
  likes: number;
}

const Comment: FC<CommentProps> = ({
  avatar,
  name,
  content,
  role,
  createdAt,
  likes,
  replies,
}: CommentProps) => {
  return (
    <Stack width={'100%'} direction={'row'} gap={'15px'}>
      <Avatar
        srcSet={avatar}
        sx={{ width: { sm: '50px', xl: '75px' }, height: '100%' }}
      />

      <Stack width={'100%'} gap={'20px'}>
        <Stack
          width={'100%'}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          pt={'4px'}
        >
          <Stack>
            <Typography variant={'body1'}>{name}</Typography>
            <Typography variant={'body2'} color={'#818181'}>
              {dayjs(createdAt).format('DD.MM.YYYY')}
            </Typography>
          </Stack>

          <Typography variant={'body1'} color={'#00534C'}>
            {role}
          </Typography>
        </Stack>

        <Typography variant={'body1'}>{content}</Typography>

        <Stack
          color={'#00A04A'}
          direction={'row'}
          gap={'40px'}
          alignItems={'center'}
        >
          <Typography variant={'body1'} color={'#818181'}>
            Reply
          </Typography>

          <Stack direction={'row'} gap={'5px'} alignItems={'center'}>
            <ThumbUpOutlined color={'inherit'} fontSize={'small'} />
            <Typography>{likes ? `${likes} Likes` : 'Like'}</Typography>
          </Stack>
        </Stack>

        {replies.length > 0 && (
          <Stack
            direction={'row'}
            gap={'10px'}
            px={'10px'}
            sx={{ cursor: 'pointer' }}
            alignItems={'center'}
          >
            <ShortcutOutlined sx={{ transform: 'scaleY(-1)' }} />
            <Typography>{replies.length} likes</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Comment;
