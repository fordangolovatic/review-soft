import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useToast } from '../../../utilities/hooks/useToast';
import { addFavoriteArticle } from '../../service/favorite-articles';

export const useAddFavoriteArticleMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation(
    (favoriteArticleId: number) =>
      addFavoriteArticle(favoriteArticleId)
        .then(() => {
          queryClient.invalidateQueries(['favorite-articles']);
          notifySuccess('The article was successfully added to the favorites.');
        })
        .catch((error) =>
          notifyError(
            `Something went wrong. ${error.response?.data?.messages?.[0]?.errors?.[0]}`,
          ),
        ),
    {
      ...options,
      // NOTE: Disabled until error boundary
      // onSuccess: () => {
      //   queryClient.invalidateQueries(['favorite-articles']);
      //   notifySuccess('The article was successfully added to the favorites.');
      // },
      // onError: () => {
      //   notifyError('Something went wrong. Please try again later.');
      // },
    },
  );
};
