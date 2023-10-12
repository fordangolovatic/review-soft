import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityEntity } from '../entities/city.entity';

/**
 * A service contract which must be implemented by [CityService]{@link CityService}.
 */
export interface CityServiceInterface {
	/**
	 * Returns a list of all the records of city.
	 */
	getAll(): Promise<CityEntity[]>;

	/**
	 * Returns a single record of city based on the given city id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CityEntity>;

	/**
	 * Returns a single record of city based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CityEntity>;

	/**
	 * Returns a list of records of city based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions<any>): Promise<CityEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateCityDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCityDto): Promise<CityEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCityDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCityDto): Promise<UpdateResult>;

	/**
	 * Create / update city.
	 * @param {CreateCityDto | UpdateCityDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: CreateCityDto | UpdateCityDto): Promise<CityEntity>;

	/**
	 * Delete city based on the given city id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
