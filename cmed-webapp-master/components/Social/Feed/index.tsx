import { Stack, Typography } from '@mui/material';
import { useSocialMediaPostsQuery } from '../../../api/hooks/social-media/useSocialMediaPostsQuery';
import Post from './Post';
import PostSkeleton from './Post/components/PostSkeleton';

const Feed = () => {
  const { data, isLoading: isPostsLoading } = useSocialMediaPostsQuery();

  return (
    <Stack gap={'20px'}>
      {isPostsLoading ? (
        Array.from(Array(10)).map((_, index) => <PostSkeleton key={index} />)
      ) : data && data.length > 0 ? (
        data.map((post) => <Post key={post.postId} data={post} />)
      ) : (
        <Stack width={'100%'} alignItems={'center'}>
          <Typography variant={'body1'}>No posts found</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default Feed;
