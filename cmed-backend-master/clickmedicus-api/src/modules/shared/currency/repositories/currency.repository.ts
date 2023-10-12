import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { CurrencyRepositoryInterface } from '../interfaces/currency.repository.interface';
import { CurrencyEntity } from '../entities/currency.entity';

/**
 * A repository for currency table.
 */
@Injectable()
export class CurrencyRepository
	extends BaseAbstractRepository<CurrencyEntity>
	implements CurrencyRepositoryInterface
{
	constructor(
		@InjectRepository(CurrencyEntity)
		private readonly currencyRepository: Repository<CurrencyEntity>
	) {
		super(currencyRepository);
	}
}
