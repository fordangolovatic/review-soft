import { Injectable, Inject } from '@nestjs/common';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { FavoriteArticlesRepositoryInterface } from './interface/favorite-article.repository.interface';
import { DeleteResult } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { FavoriteArticlesServiceInterface } from './interface/favorite-article.service.interface';
import { FavoriteArticleEntity } from './entities/favorite-article.entity';
import { CreateFavoriteArtilceDto } from './dto/create-favorite-artilce.dto';

@Injectable()
export class FavoriteArtilcesServiceService
	implements FavoriteArticlesServiceInterface
{
	constructor(
		@Inject(DIToken.FAVORITE_ARTICLES_REPOSITORY_INTERFACE)
		private readonly favoriteArticlesRepository: FavoriteArticlesRepositoryInterface
	) {}
	/**
	 * Returns a list of all the records of favorite article.
	 */
	getAll(user: UserAccountEntity): Promise<FavoriteArticleEntity[]> {
		try {
			return this.favoriteArticlesRepository.getAllFavoriteArticle(user);
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Create record(s).
	 * @param {CreateFavoriteArticleDto} data - Data which need to be inserted in database table.
	 */
	createFavoriteArticle(
		data: CreateFavoriteArtilceDto,
		user: UserAccountEntity
	): Promise<FavoriteArticleEntity> {
		try {
			data.createdBy = user;
			return this.favoriteArticlesRepository.createEntity(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete favorite article based on the given favorite article id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.favoriteArticlesRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
