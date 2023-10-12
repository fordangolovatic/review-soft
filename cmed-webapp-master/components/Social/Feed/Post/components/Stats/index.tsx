import {
  CommentOutlined,
  ThumbUpOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { PostStats } from '../../../types';

const PostStats: FC<PostStats> = ({ likes, comments, views }) => {
  return (
    <Stack
      direction={'row'}
      gap={'40px'}
      color={'#818181'}
      px={'20px'}
      alignItems={'center'}
      sx={{ userSelect: 'none' }}
    >
      <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
        <ThumbUpOutlined fontSize={'small'} color={'inherit'} />
        <Typography>{likes}</Typography>
      </Stack>
      <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
        <CommentOutlined fontSize={'small'} color={'inherit'} />
        <Typography>{comments}</Typography>
      </Stack>
      <Stack direction={'row'} gap={'10px'} alignItems={'center'}>
        <VisibilityOutlined fontSize={'small'} color={'inherit'} />
        <Typography>{views}</Typography>
      </Stack>
    </Stack>
  );
};

export default PostStats;
