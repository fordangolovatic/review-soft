import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteArticle } from '../../service/article';

export const useArticleDeleteMutation = (
  options: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation((articleId: number) => deleteArticle(articleId), {
    ...options,
  });
};
