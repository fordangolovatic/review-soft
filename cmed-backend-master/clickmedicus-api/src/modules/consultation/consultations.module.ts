import { DIToken } from '@core/constants/enums/ditoken.enum';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationSessionDetailEntity } from './consultation-session-detail/entities/consultation-session-detail.entity';
import { ConsultationSessionEntity } from './consultation-session/entities/consultation-session.entity';
import { ConsultationsController } from './consultation.controller';
import { ConsultationsService } from './consultation.service';
import { ConsultationsRepository } from './respositories/consultations.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProfessionalInfoEntity,
			ArticleEntity,
			ConsultationSessionEntity,
			ConsultationSessionDetailEntity,
			UserAccountEntity,
			ActivityProgramEntity
		])
	],
	controllers: [ConsultationsController],
	providers: [
		{
			provide: DIToken.CONSULTATIONS_REPOSITORY_INTERFACE,
			useClass: ConsultationsRepository
		},
		{
			provide: DIToken.CONSULTATIONS_SERVICE_INTERFACE,
			useClass: ConsultationsService
		},
		{
			provide: DIToken.ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		}
	]
})
export class ConsultationsModule {}
