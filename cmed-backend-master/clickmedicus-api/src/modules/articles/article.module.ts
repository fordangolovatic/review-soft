import { DIToken } from '@core/constants/enums/ditoken.enum';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';
import { LanguageRepository } from '@modules/shared/language/repositories/language.repository';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { SpecialitiesRepository } from '@modules/specialities/repositories/specialities.repository';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepository } from './repositories/article.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ArticleEntity,
			SpecialityEntity,
			LanguageEntity,
			UserAccountEntity
		])
	],
	controllers: [ArticlesController],
	providers: [
		{
			provide: DIToken.ARTICLE_REPOSITORY_INTERFACE,
			useClass: ArticleRepository
		},
		{
			provide: DIToken.ARTICLE_SERVICE_INTERFACE,
			useClass: ArticleService
		},
		{
			provide: DIToken.SPECIALITIES_REPOSITORY_INTERFACE,
			useClass: SpecialitiesRepository
		},
		{
			provide: DIToken.LANGUAGE_REPOSITORY_INTERFACE,
			useClass: LanguageRepository
		}
	]
})
export class ArticleModule {}
