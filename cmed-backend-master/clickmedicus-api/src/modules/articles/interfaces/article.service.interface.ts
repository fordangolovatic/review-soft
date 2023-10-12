import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { ArticleEntity } from '../entities/article.entity';

/**
 * A service contract which must be implemented by [ArticleService]{@link ArticleService}.
 */
export interface ArticleServiceInterface {
	createArticle(createArticleDto: CreateArticleDto, user: UserAccountEntity);

	getAllArticle();

	getUserArticles(user: UserAccountEntity);

	getById(id: number);

	deleteById(id: number, userId: number);

	updateById(id: number, updateArticleDto: UpdateArticleDto, userId: number);

	isSpecialityPresentInArticle(article: ArticleEntity, speciality: string);
}
