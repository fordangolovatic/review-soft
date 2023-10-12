import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { SpecialitiesRepository } from './repositories/specialities.repository';
import { SpecialityEntity } from './entities/speciality.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

@Module({
	imports: [TypeOrmModule.forFeature([SpecialityEntity, UserAccountEntity])],
	controllers: [SpecialitiesController],
	providers: [
		{
			provide: DIToken.SPECIALITIES_REPOSITORY_INTERFACE,
			useClass: SpecialitiesRepository
		},
		{
			provide: DIToken.SPECIALITIES_SERVICE_INTERFACE,
			useClass: SpecialitiesService
		}
	]
})
export class SpecialitiesModule {}
