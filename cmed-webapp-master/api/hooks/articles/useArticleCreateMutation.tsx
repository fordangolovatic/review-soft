import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createArticle } from '../../service/article';
import { CreateArticle } from '../../types/articles';

export const useArticleCreateMutation = (
  options: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation((article: CreateArticle) => createArticle(article), {
    ...options,
  });
};
