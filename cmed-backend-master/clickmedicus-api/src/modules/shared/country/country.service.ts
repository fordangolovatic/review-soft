import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { CountryRepositoryInterface } from './interfaces/country.repository.interface';
import { CountryServiceInterface } from './interfaces/country.service.interface';

import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryEntity } from './entities/country.entity';

/**
 * A service / provider for country table.
 */
@Injectable()
export class CountryService implements CountryServiceInterface {
	constructor(
		@Inject(DIToken.COUNTRY_REPOSITORY_INTERFACE)
		private readonly countryRepository: CountryRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of country.
	 */
	getAll(): Promise<CountryEntity[]> {
		try {
			return this.countryRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of country based on the given country id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CountryEntity> {
		try {
			return this.countryRepository.getOneById({
				where: {
					countryId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of country based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CountryEntity> {
		try {
			return this.countryRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of country based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<CountryEntity[]> {
		try {
			return this.countryRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create new country.
	 * @param {CreateCountryDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCountryDto): Promise<CountryEntity> {
		try {
			return this.countryRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update an existing country
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCountryDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCountryDto): Promise<UpdateResult> {
		try {
			return this.countryRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update country
	 * @param {CreateCountryDto | UpdateCountryDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateCountryDto | UpdateCountryDto
	): Promise<CountryEntity> {
		try {
			return this.countryRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete country based on the given country id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.countryRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
