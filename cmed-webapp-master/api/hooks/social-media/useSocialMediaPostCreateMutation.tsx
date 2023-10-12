import { useMutation } from '@tanstack/react-query';
import socialFeedApi from '../../service/social-media/socialFeedApi';
import { INewPost } from '../../types/social-media/posts';

export const useSocialMediaPostCreateMutation = () => {
  const { createPost } = socialFeedApi();

  return useMutation(async (data: INewPost): Promise<any> => {
    return await createPost(data);
  });
};
