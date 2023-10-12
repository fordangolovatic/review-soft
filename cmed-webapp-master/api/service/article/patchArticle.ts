import api from '../../config/api';
import { UpdateArticle } from '../../types/articles';

export const patchArticle = async (article: UpdateArticle) => {
  return await api
    .patch(`articles/${article.articleId}`, article)
    .then((res) => res.data);
};
