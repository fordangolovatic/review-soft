import { DIToken } from '@core/constants/enums/ditoken.enum';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidentController } from './resident.controller';
import { ResidentService } from './resident.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProfessionalInfoEntity,
			ArticleEntity,
			UserAccountEntity,
			ConsultationSessionEntity
		])
	],
	controllers: [ResidentController],
	providers: [
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		ResidentService
	]
})
export class ResidentModule {}
