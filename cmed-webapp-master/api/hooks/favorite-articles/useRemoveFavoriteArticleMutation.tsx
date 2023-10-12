import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useToast } from '../../../utilities/hooks/useToast';
import { removeFavoriteArticles } from '../../service/favorite-articles';

export const useRemoveFavoriteArticleMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation(
    (favoriteArticleId: number) => removeFavoriteArticles(favoriteArticleId),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(['favorite-articles']);
        notifySuccess('The article was successfully removed to the favorites.');
      },
      onError: () => {
        notifyError('Something went wrong. Please try again later.');
      },
    },
  );
};
