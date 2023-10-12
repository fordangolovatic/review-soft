import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryService } from './country.service';
import { CountryController } from './country.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { CountryRepository } from './repositories/country.repository';

import { CountryEntity } from './entities/country.entity';

/**
 * A module class for country module.
 */
@Module({
	imports: [TypeOrmModule.forFeature([CountryEntity])],
	providers: [
		{
			provide: DIToken.COUNTRY_REPOSITORY_INTERFACE,
			useClass: CountryRepository
		},
		{
			provide: DIToken.COUNTRY_SERVICE_INTERFACE,
			useClass: CountryService
		}
	],
	controllers: [CountryController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.COUNTRY_REPOSITORY_INTERFACE,
			useClass: CountryRepository
		},
		{
			provide: DIToken.COUNTRY_SERVICE_INTERFACE,
			useClass: CountryService
		}
	]
})
export class CountryModule {}
