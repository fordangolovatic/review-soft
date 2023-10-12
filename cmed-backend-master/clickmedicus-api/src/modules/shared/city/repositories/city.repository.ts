import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { CityRepositoryInterface } from '../interfaces/city.repository.interface';
import { CityEntity } from '../entities/city.entity';

/**
 * A repository for city table.
 */
@Injectable()
export class CityRepository
	extends BaseAbstractRepository<CityEntity>
	implements CityRepositoryInterface
{
	constructor(
		@InjectRepository(CityEntity)
		private readonly cityRepository: Repository<CityEntity>
	) {
		super(cityRepository);
	}
}
