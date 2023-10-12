import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
/**
 * A contract for [ArticleRepository]{@link ArticleRepository} class.
 */
export interface ArticleRepositoryInterface
	extends BaseRepositoryInterface<ArticleEntity> {
	getAll(): Promise<any>;

	getUserArticles(user: UserAccountEntity): Promise<ArticleEntity[]>;

	createEntity(
		createArticleDto: CreateArticleDto,
		user: UserAccountEntity
	): Promise<ArticleEntity>;

	getById(articleId: number): Promise<ArticleEntity>;

	save(articleEntity: ArticleEntity): Promise<any>;

	deleteById(articleId: number): Promise<any>;
}
