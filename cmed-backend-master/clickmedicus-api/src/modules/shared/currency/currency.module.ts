import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { CurrencyRepository } from './repositories/currency.repository';

import { CurrencyEntity } from './entities/currency.entity';

/**
 * A module class for currency module.
 */
@Module({
	imports: [TypeOrmModule.forFeature([CurrencyEntity])],
	providers: [
		{
			provide: DIToken.CURRENCY_REPOSITORY_INTERFACE,
			useClass: CurrencyRepository
		},
		{
			provide: DIToken.CURRENCY_SERVICE_INTERFACE,
			useClass: CurrencyService
		}
	],
	controllers: [CurrencyController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.CURRENCY_REPOSITORY_INTERFACE,
			useClass: CurrencyRepository
		},
		{
			provide: DIToken.CURRENCY_SERVICE_INTERFACE,
			useClass: CurrencyService
		}
	]
})
export class CurrencyModule {}
