import {
  CommentOutlined,
  IosShareOutlined,
  ReplyAllOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { FC } from 'react';

const PostActions: FC = () => {
  return (
    <Stack
      width={'100%'}
      direction={'row'}
      justifyContent={'space-around'}
      borderTop={'1px solid #818181'}
      pt={'20px'}
    >
      <Stack direction={'row'} gap={'10px'} sx={{ cursor: 'pointer' }}>
        <ThumbUpOutlined fontSize={'small'} />
        <Typography variant={'body1'} sx={{ display: { xs: 'none', md: 'block' } }}>
          Like
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={'10px'} sx={{ cursor: 'pointer' }}>
        <CommentOutlined fontSize={'small'} />
        <Typography variant={'body1'} sx={{ display: { xs: 'none', md: 'block' } }}>
          Comment
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={'10px'} sx={{ cursor: 'pointer' }}>
        <IosShareOutlined fontSize={'small'} />
        <Typography variant={'body1'} sx={{ display: { xs: 'none', md: 'block' } }}>
          Share
        </Typography>
      </Stack>
      <Stack direction={'row'} gap={'10px'} sx={{ cursor: 'pointer' }}>
        <ReplyAllOutlined fontSize={'small'} />
        <Typography variant={'body1'} sx={{ display: { xs: 'none', md: 'block' } }}>
          Send
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PostActions;
