import { DeleteResult, FindManyOptions } from 'typeorm';
import { CreateFavoriteArtilceDto } from '../dto/create-favorite-artilce.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { FavoriteArticleEntity } from '../entities/favorite-article.entity';

/**
 * A service contract which must be implemented by [FavoriteartilcesService]{@link FavoriteArticlesService}.
 */
export interface FavoriteArticlesServiceInterface {
	/**
	 * Returns a list of all the records of favorite artilces.
	 */
	getAll(user: UserAccountEntity): Promise<FavoriteArticleEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateFavoriteArticleDto } data - Data which need to be inserted in database table.
	 */
	createFavoriteArticle(
		data: CreateFavoriteArtilceDto,
		user: UserAccountEntity
	): Promise<FavoriteArticleEntity>;

	/**
	 * Delete feature group based on the given favorite doctor id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
