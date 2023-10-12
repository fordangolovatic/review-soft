import { Article } from '../articles';

interface FavoriteArticleUser {
  userId: number;
  accountId: number;
  firstName: string;
  lastName: string;
}

export interface FavoriteArticle {
  favoriteArticleId: number;
  createdDate: Date;
  createdBy: FavoriteArticleUser;
  article: Article;
}
