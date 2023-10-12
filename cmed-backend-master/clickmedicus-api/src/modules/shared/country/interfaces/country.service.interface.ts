import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';
import { CountryEntity } from '../entities/country.entity';

/**
 * A service contract which must be implemented by [CountryService]{@link CountryService}.
 */
export interface CountryServiceInterface {
	/**
	 * Returns a list of all the records of country.
	 */
	getAll(): Promise<CountryEntity[]>;

	/**
	 * Returns a single record of country based on the given country id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CountryEntity>;

	/**
	 * Returns a single record of country based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CountryEntity>;

	/**
	 * Returns a list of records of country based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<CountryEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateCountryDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCountryDto): Promise<CountryEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCountryDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCountryDto): Promise<UpdateResult>;

	/**
	 * Create / update country.
	 * @param {CreateCountryDto | UpdateCountryDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateCountryDto | UpdateCountryDto
	): Promise<CountryEntity>;

	/**
	 * Delete country based on the given country id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
