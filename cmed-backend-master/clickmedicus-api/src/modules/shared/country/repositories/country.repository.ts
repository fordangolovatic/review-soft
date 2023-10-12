import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { CountryRepositoryInterface } from '../interfaces/country.repository.interface';
import { CountryEntity } from '../entities/country.entity';

/**
 * A repository for country table.
 */
@Injectable()
export class CountryRepository
	extends BaseAbstractRepository<CountryEntity>
	implements CountryRepositoryInterface
{
	constructor(
		@InjectRepository(CountryEntity)
		private readonly countryRepository: Repository<CountryEntity>
	) {
		super(countryRepository);
	}
}
