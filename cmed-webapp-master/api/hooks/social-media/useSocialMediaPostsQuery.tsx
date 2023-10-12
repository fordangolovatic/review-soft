import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import socialFeedApi from '../../service/social-media/socialFeedApi';
import { SocialMediaPost } from '../../types/social-media/posts';

const SOCIAL_MEDIA_POSTS_QUERY_KEY = ['posts'];

export const useSocialMediaPostsQuery = (
  options?: UseQueryOptions<SocialMediaPost[]>,
) => {
  const { getPosts } = socialFeedApi();

  return useQuery<SocialMediaPost[]>(
    SOCIAL_MEDIA_POSTS_QUERY_KEY,
    async (): Promise<SocialMediaPost[]> => {
      return await getPosts();
    },
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
