import { DeleteOutline } from '@mui/icons-material';
import { Box, Card, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useSocialMediaPostDeleteMutation } from '../../../../api/hooks/social-media/useSocialMediaPostDeleteMutation';
import { SocialMediaPost } from '../../../../api/types/social-media/posts';
import PostActions from './components/Actions';
import PostAuthor from './components/Author';
import PostStats from './components/Stats';

const Post: React.FC<{ data: SocialMediaPost }> = ({ data }) => {
  const queryClient = useQueryClient();
  const deleteMutation = useSocialMediaPostDeleteMutation();

  const handlePostDelete = async () => {
    await deleteMutation.mutateAsync(data.postId, {
      onSuccess: async () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
    });
  };

  return (
    <Card
      variant={'outlined'}
      sx={{ position: 'relative', paddingTop: '20px', paddingBottom: '20px' }}
    >
      <Box
        position={'absolute'}
        right={'20px'}
        top={'20px'}
        onClick={handlePostDelete}
      >
        <DeleteOutline />
      </Box>

      <Stack gap={'18px'}>
        <Stack gap={'15px'}>
          <Stack px={'20px'} gap={'15px'}>
            <PostAuthor
              user={{
                name: 'Username',
                role: 'Doctor',
                avatar: '/images/doctorCard.png',
              }}
              createdAt={data.created_date}
            />
            <Typography variant={'body2'}>{data.content}</Typography>
          </Stack>
          {/* We need to implement attachments on back-end */}
          {/* {data.attachment && (
            <Box width={'100%'} height={'330px'} position={'relative'}>
              <Image
                src={data.attachment}
                alt={`${data.user.name} avatar`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          )} */}
        </Stack>
        <PostStats
          likes={0} // data.likes.length
          comments={0} // data.comments.length
          views={0} // data.views
        />
        <PostActions />
      </Stack>
    </Card>
  );
};

export default Post;
