import { DIToken } from '@core/constants/enums/ditoken.enum';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProfessionalInfoEntity,
			ArticleEntity,
			UserAccountEntity,
			ConsultationSessionEntity
		])
	],
	controllers: [DoctorController],
	providers: [
		{
			provide: DIToken.ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		DoctorService
	]
})
export class DoctorModule {}
