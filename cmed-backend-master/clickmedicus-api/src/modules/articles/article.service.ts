import { DIToken } from '@core/constants/enums/ditoken.enum';
import { LanguageRepositoryInterface } from '@modules/shared/language/interfaces/language.repository.interface';
import { SpecialitiesRepositoryInterface } from '@modules/specialities/interfaces/specialities.repository.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepositoryInterface } from './interfaces/article.repository.interface';

@Injectable()
export class ArticleService {
	constructor(
		@Inject(DIToken.ARTICLE_REPOSITORY_INTERFACE)
		private readonly articleRepository: ArticleRepositoryInterface,
		@Inject(DIToken.SPECIALITIES_REPOSITORY_INTERFACE)
		private readonly specialitiesRepository: SpecialitiesRepositoryInterface,
		@Inject(DIToken.LANGUAGE_REPOSITORY_INTERFACE)
		private readonly languageRepository: LanguageRepositoryInterface
	) {}

	/**
	 * Create new article.
	 * @param {CreateArticleDto} createArticleDto - Data transfer object for creating article.
	 * @param {UserAccountEntity} user - User account entity.
	 */
	async createArticle(
		createArticleDto: CreateArticleDto,
		user: UserAccountEntity
	): Promise<ArticleEntity> {
		createArticleDto.createdBy = user;
		return this.articleRepository.createEntity(createArticleDto, user);
	}

	/**
	 * Get all Articles.
	 */
	async getAllArticle() {
		return this.articleRepository.getAll();
	}

	/**
	 * Get logged-in user articles
	 */
	async getUserArticles(user: UserAccountEntity) {
		return this.articleRepository.getUserArticles(user);
	}

	/**
	 * Get Article by id.
	 * @param {aritcleId} aritcleId - Article id.
	 */
	async getById(articleId: number) {
		return this.articleRepository.getById(articleId);
	}

	/**
	 * Delete Article by id.
	 * @param {aritcleId} aritcleId - Article id.
	 */
	async deleteById(articleId: number, userId: number) {
		const article = await this.articleRepository.getById(articleId);
		if (article.createdBy.userId !== userId) {
			return { error: 'Unauthorised to perform this action' };
		}
		return this.articleRepository.deleteById(articleId);
	}

	/**
	 * Update Article by id.
	 * @param {aritcleId} aritcleId - Article id..
	 * @param {updateArticleDto} updateArticleDto - UpdateArticleDto
	 */
	async updateById(
		articleId: number,
		updateArticleDto: UpdateArticleDto,
		userId: number
	) {
		let article = await this.articleRepository.getById(articleId);
		if (article.createdBy.userId !== userId) {
			return { error: 'Unauthorised to perform this action' };
		}

		const hasSpecialityChanged =
			updateArticleDto?.specialityId !==
			article?.speciality?.specialityId;
		const hasLanguageChanged =
			updateArticleDto?.languageId !== article?.language?.languageId;

		if (hasSpecialityChanged) {
			const newSpeciality =
				await this.specialitiesRepository.getOneByCondition({
					where: { specialityId: updateArticleDto.specialityId }
				});

			if (!newSpeciality) {
				throw Error('Speciality not found');
			}

			article.speciality = newSpeciality;
		}

		if (hasLanguageChanged) {
			const newLanguage = await this.languageRepository.getOneByCondition(
				{ where: { languageId: updateArticleDto.languageId } }
			);

			if (!newLanguage) {
				throw Error('Language not found');
			}

			article.language = newLanguage;
		}

		Object.assign(article, updateArticleDto);

		return this.articleRepository.save(article);
	}
}
