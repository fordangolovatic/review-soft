import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { FavoriteArticlesRepositoryInterface } from '../interface/favorite-article.repository.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { FavoriteArticleEntity } from '../entities/favorite-article.entity';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { CreateFavoriteArtilceDto } from '../dto/create-favorite-artilce.dto';

/**
 * A repository for favorite article table
 */
@Injectable()
export class FavoriteArticlesRepository
	extends BaseAbstractRepository<FavoriteArticleEntity>
	implements FavoriteArticlesRepositoryInterface
{
	constructor(
		@InjectRepository(FavoriteArticleEntity)
		private readonly favoriteArticleRepository: Repository<FavoriteArticleEntity>,
		@InjectRepository(ArticleEntity)
		private readonly articleRepository: Repository<ArticleEntity>
	) {
		super(favoriteArticleRepository);
	}

	async getAllFavoriteArticle(user: UserAccountEntity): Promise<any> {
		const data = await this.favoriteArticleRepository.find({
			where: [{ createdBy: { userId: user.userId } }],
			relations: {
				createdBy: true,
				article: {
					speciality: true,
					language: true,
					createdBy: {
						languages: true,
						country: true
					}
				}
			},
			select: {
				createdBy: {
					userId: true,
					firstName: true,
					lastName: true
				}
			}
		});
		const result = data.map(el => {
			return {
				...el,
				article: {
					...el.article,
					image:
						el.article.image?.startsWith('http://') ||
						el.article.image?.startsWith('https://')
							? el.article.image
							: null
				}
			};
		});

		return result;
	}

	async createEntity(
		createFavoriteArticleDto: CreateFavoriteArtilceDto
	): Promise<FavoriteArticleEntity> {
		const favoriteArticle = this.favoriteArticleRepository.create();
		favoriteArticle.createdBy = createFavoriteArticleDto.createdBy;
		const article = await this.articleRepository.findOne({
			relations: {
				createdBy: true
			},
			where: { articleId: createFavoriteArticleDto.articleId }
		});
		
		if (!article) {
			throw Error('Please select valid article');
		}

		if (
			article.createdBy.userId === createFavoriteArticleDto.createdBy.userId
		) {
			throw Error('You can not add your own article to favorites');
		}

		favoriteArticle.article = article;
		return this.favoriteArticleRepository.save(favoriteArticle);
	}
}
