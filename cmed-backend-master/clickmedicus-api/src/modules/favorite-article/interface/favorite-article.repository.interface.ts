import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { FavoriteArticleEntity } from '../entities/favorite-article.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateFavoriteArtilceDto } from '../dto/create-favorite-artilce.dto';

/**
 * A contract for [FavoriteArticlesRepository]{@link FavoriteArticlesRepository} class.
 */
export interface FavoriteArticlesRepositoryInterface
	extends BaseRepositoryInterface<FavoriteArticleEntity> {
	getAllFavoriteArticle(user: UserAccountEntity): Promise<any>;
	createEntity(
		createFavoriteArticleDto: CreateFavoriteArtilceDto
	): Promise<FavoriteArticleEntity>;
}
