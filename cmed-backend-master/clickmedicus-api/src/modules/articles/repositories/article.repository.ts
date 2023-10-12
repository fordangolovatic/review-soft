import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleRepositoryInterface } from '../interfaces/article.repository.interface';
import { AccountType } from '@core/constants/enums/accountType.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';

/**
 * A repository for Article table.
 */
@Injectable()
export class ArticleRepository
	extends BaseAbstractRepository<ArticleEntity>
	implements ArticleRepositoryInterface
{
	constructor(
		@InjectRepository(ArticleEntity)
		private articleRepository: Repository<ArticleEntity>,
		@InjectRepository(SpecialityEntity)
		private categoryRepository: Repository<SpecialityEntity>,
		@InjectRepository(LanguageEntity)
		private languageRepository: Repository<LanguageEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>
	) {
		super(articleRepository);
	}

	async getAll(): Promise<any> {
		const data = await this.articleRepository.find({
			relations: {
				createdBy: true,
				speciality: true,
				language: true
			},
			select: {
				createdBy: {
					userId: true,
					firstName: true,
					lastName: true
				}
			}
			// relations: { specialities: true }
		});

		const result = data.map(el => {
			return {
				...el,
				image:
					el.image?.startsWith('http://') ||
					el.image?.startsWith('https://')
						? el.image
						: null
			};
		});
		return result;
	}

	async getUserArticles(user: UserAccountEntity): Promise<ArticleEntity[]> {
		const userArticles = await this.articleRepository.find({
			where: { createdBy: { userId: user.userId } },
			relations: { createdBy: true, language: true, speciality: true },
			select: {
				createdBy: {
					userId: true,
					firstName: true,
					lastName: true
				}
			}
		});

		return userArticles;
	}

	async createEntity(
		createArticleDto: CreateArticleDto,
		user: UserAccountEntity
	): Promise<ArticleEntity> {
		const doctor = await this.userAccountRepository.findOne({
			where: { userId: user.userId, accountType: AccountType.DOCTOR }
		});
		if (!doctor) {
			throw Error('Only doctor can create article');
		}
		const article = this.articleRepository.create();

		if (createArticleDto.specialityId) {
			const articleSpeciality = await this.categoryRepository.findOne({
				where: { specialityId: createArticleDto.specialityId }
			});
			
			if (!articleSpeciality) {
				throw Error('Invalid speciality');
			}

			article.speciality = articleSpeciality;
		}

		if (createArticleDto.languageId) {
			const articleLanguage = await this.languageRepository.findOne({
				where: { languageId: createArticleDto.languageId }
			});

			if (!articleLanguage) {
				throw Error('Invalid language');
			}

			article.language = articleLanguage;
		}

		article.title = createArticleDto.title;
		article.content = createArticleDto.content;
		article.type = createArticleDto.type;
		article.image = createArticleDto.image;
		article.createdBy = createArticleDto.createdBy;
		return this.articleRepository.save(article);
	}

	async save(articleEntity: ArticleEntity) {
		return this.articleRepository.save(articleEntity);
	}

	async getById(articleId: number): Promise<ArticleEntity> {
		return this.articleRepository.findOne({
			where: { articleId },
			relations: { speciality: true, language: true, createdBy: true }
		});
	}

	async deleteById(articleId: number): Promise<DeleteResult> {
		return this.articleRepository.delete({
			articleId
		});
	}
}
