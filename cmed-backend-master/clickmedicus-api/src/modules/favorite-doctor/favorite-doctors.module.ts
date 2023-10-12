import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteDoctorEntity } from './entities/favorite-doctor.entity';
import { FavoriteDoctorsController } from './favorite-doctors.controller';
import { FavoriteDoctorsService } from './favorite-doctors.service';
import { FavoriteDoctorsRepository } from './repository/favorite-doctors.repository';

@Module({
	imports: [TypeOrmModule.forFeature([FavoriteDoctorEntity, UserAccountEntity])],
	providers: [
		{
			provide: DIToken.FAVORITE_DOCTORS_SERVICE_INTERFACE,
			useClass: FavoriteDoctorsService
		},
		{
			provide: DIToken.FAVORITE_DOCTORS_REPOSITORY_INTERFACE,
			useClass: FavoriteDoctorsRepository
		}
	],
	controllers: [FavoriteDoctorsController]
})
export class FavoriteDoctorsModule {}
