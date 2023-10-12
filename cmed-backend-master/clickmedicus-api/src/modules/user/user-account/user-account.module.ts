import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { DIToken } from '@core/enums/ditoken.enum';
import { CityModule } from '@modules/shared/city/city.module';
import { CountryModule } from '@modules/shared/country/country.module';
import { LanguageModule } from '@modules/shared/language/language.module';
import { StateModule } from '@modules/shared/state/state.module';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { ProfessionalExperienceEntity } from '@modules/user/user-account/entities/professional-experience.entity';
import { ProfessionalExperienceRepository } from '@modules/user/user-account/repositories/professional-experience.repository';
import { ProfessionalInfoRepository } from './repositories/professional-info.repository';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { MedicalRecordEntity } from '@modules/user/user-account/entities/medical-record.entity';
import { MedicalRecordRepository } from '@modules/user/user-account/repositories/medical-record.repository';
import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';
import { ActivityProgramRepository } from '@modules/user/user-account/repositories/activity-program.repository';
import { EmailModule } from '@modules/mail/mail.module';

/**
 * A module class for account module.
 */
@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProfessionalInfoEntity,
			ProfessionalExperienceEntity,
			UserAccountEntity,
			SpecialityEntity,
			MedicalRecordEntity,
			ActivityProgramEntity
		]),
		CountryModule,
		EmailModule,
		StateModule,
		CityModule,
		LanguageModule
	],
	providers: [
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		{
			provide: DIToken.USER_ACCOUNT_SERVICE_INTERFACE,
			useClass: UserAccountService
		},
		{
			provide: DIToken.PROFESSIONAL_EXPERIENCE_REPOSITORY_INTERFACE,
			useClass: ProfessionalExperienceRepository
		},
		{
			provide: DIToken.PROFESSIONAL_INFO_REPOSITORY_INTERFACE,
			useClass: ProfessionalInfoRepository
		},
		{
			provide: DIToken.MEDICAL_RECORD_REPOSITORY_INTERFACE,
			useClass: MedicalRecordRepository
		},
		{
			provide: DIToken.ACTIVITY_PROGRAM_REPOSITORY_INTERFACE,
			useClass: ActivityProgramRepository
		}
	],
	controllers: [UserAccountController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		{
			provide: DIToken.ACTIVITY_PROGRAM_REPOSITORY_INTERFACE,
			useClass: ActivityProgramRepository
		}
	]
})
export class UserAccountModule {}
