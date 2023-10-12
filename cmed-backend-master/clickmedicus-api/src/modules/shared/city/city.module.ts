import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CityService } from './city.service';
import { CityController } from './city.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { CityRepository } from './repositories/city.repository';

import { CityEntity } from './entities/city.entity';

/**
 * A module class for city module.
 */
@Module({
	imports: [TypeOrmModule.forFeature([CityEntity])],
	providers: [
		{
			provide: DIToken.CITY_REPOSITORY_INTERFACE,
			useClass: CityRepository
		},
		{
			provide: DIToken.CITY_SERVICE_INTERFACE,
			useClass: CityService
		}
	],
	controllers: [CityController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.CITY_REPOSITORY_INTERFACE,
			useClass: CityRepository
		},
		{
			provide: DIToken.CITY_SERVICE_INTERFACE,
			useClass: CityService
		}
	]
})
export class CityModule {}
