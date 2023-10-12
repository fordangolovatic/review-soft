import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountModule } from '@modules/user/user-account/user-account.module';
import { UserSessionModule } from '@modules/user/user-session/user-session.module';
import { AuthRepository } from './repositories/auth.repository';
import { JwtLogoutStrategy } from './strategies/jwt-logout.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserAccountService } from '@modules/user/user-account/user-account.service';
import { MedicalRecordRepository} from '@modules/user/user-account/repositories/medical-record.repository';
import {ProfessionalExperienceRepository} from '@modules/user/user-account/repositories/professional-experience.repository';
import { ProfessionalInfoRepository } from '@modules/user/user-account/repositories/professional-info.repository';
import { EmailModule } from '@modules/mail/mail.module'


@Module({
	imports: [
		UserSessionModule,
		UserAccountModule,
		EmailModule,
		// RoleModule,
		PassportModule,
		// UserRoleModule,
		// AccountModule,
		JwtModule.register({
			secret: 'H@rd1k',
			signOptions: {
				expiresIn: '60s'
			}
		})
	],
	providers: [
		{
			provide: DIToken.PROFESSIONAL_EXPERIENCE_REPOSITORY_INTERFACE,
			useClass: ProfessionalExperienceRepository
		},
		{
			provide: DIToken.PROFESSIONAL_INFO_REPOSITORY_INTERFACE,
			useClass: ProfessionalInfoRepository
		},
		{
			provide: DIToken.USER_ACCOUNT_SERVICE_INTERFACE,
			useClass: UserAccountService
		},
		{
			provide: DIToken.MEDICAL_RECORD_REPOSITORY_INTERFACE,
			useClass: MedicalRecordRepository
		},
		{
			provide: DIToken.AUTH_REPOSITORY_INTERFACE,
			useClass: AuthRepository
		},
		{
			provide: DIToken.AUTH_SERVICE_INTERFACE,
			useClass: AuthService
		},
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		JwtLogoutStrategy
	],
	controllers: [AuthController],
	exports: [
		{
			provide: DIToken.AUTH_SERVICE_INTERFACE,
			useClass: AuthService
		}
	]
})
export class AuthModule {}
