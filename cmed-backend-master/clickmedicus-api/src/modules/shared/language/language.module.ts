import { DIToken } from '@core/enums/ditoken.enum';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageEntity } from './entities/language.entity';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { LanguageRepository } from './repositories/language.repository';

/**
 * A module class for language module.
 */
@Module({
	imports: [
		TypeOrmModule.forFeature([
			LanguageEntity,
			ProfessionalInfoEntity,
			ArticleEntity,
			UserAccountEntity,
			ConsultationSessionEntity
		])
	],
	providers: [
		{
			provide: DIToken.LANGUAGE_REPOSITORY_INTERFACE,
			useClass: LanguageRepository
		},
		{
			provide: DIToken.LANGUAGE_SERVICE_INTERFACE,
			useClass: LanguageService
		},
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		}
	],
	controllers: [LanguageController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.LANGUAGE_REPOSITORY_INTERFACE,
			useClass: LanguageRepository
		},
		{
			provide: DIToken.LANGUAGE_SERVICE_INTERFACE,
			useClass: LanguageService
		}
	]
})
export class LanguageModule {}
