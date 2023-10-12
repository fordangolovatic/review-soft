import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { patchArticle } from '../../service/article';
import { UpdateArticle } from '../../types/articles';

export const useArticleUpdateMutation = (
  options: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation((article: UpdateArticle) => patchArticle(article), {
    ...options,
  });
};
