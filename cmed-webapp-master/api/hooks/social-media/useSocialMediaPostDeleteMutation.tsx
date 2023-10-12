import { useMutation } from '@tanstack/react-query';
import socialFeedApi from '../../service/social-media/socialFeedApi';

export const useSocialMediaPostDeleteMutation = () => {
  const { deletePost } = socialFeedApi();

  return useMutation(async (postId: string): Promise<boolean> => {
    return await deletePost(postId);
  });
};
