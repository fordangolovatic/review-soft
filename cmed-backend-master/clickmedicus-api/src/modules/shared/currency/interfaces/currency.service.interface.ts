import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';
import { CurrencyEntity } from '../entities/currency.entity';

/**
 * A service contract which must be implemented by [CurrencyService]{@link CurrencyService}.
 */
export interface CurrencyServiceInterface {
	/**
	 * Returns a list of all the records of currency.
	 */
	getAll(): Promise<CurrencyEntity[]>;

	/**
	 * Returns a single record of currency based on the given currency id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CurrencyEntity>;

	/**
	 * Returns a single record of currency based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CurrencyEntity>;

	/**
	 * Returns a list of records of currency based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<CurrencyEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateCurrencyDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCurrencyDto): Promise<CurrencyEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCurrencyDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCurrencyDto): Promise<UpdateResult>;

	/**
	 * Create / update currency.
	 * @param {CreateCurrencyDto | UpdateCurrencyDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateCurrencyDto | UpdateCurrencyDto
	): Promise<CurrencyEntity>;

	/**
	 * Delete currency based on the given currency id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
