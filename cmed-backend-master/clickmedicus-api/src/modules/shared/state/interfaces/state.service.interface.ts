import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { CreateStateDto } from '../dto/create-state.dto';
import { UpdateStateDto } from '../dto/update-state.dto';
import { StateEntity } from '../entities/state.entity';

/**
 * A service contract which must be implemented by [StateService]{@link StateService}.
 */
export interface StateServiceInterface {
	/**
	 * Returns a list of all the records of state.
	 */
	getAll(): Promise<StateEntity[]>;

	/**
	 * Returns a single record of state based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<StateEntity>;

	/**
	 * Returns a single record of state based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<StateEntity>;

	/**
	 * Returns a list of records of state based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions<any>): Promise<StateEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateStateDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateStateDto): Promise<StateEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateStateDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateStateDto): Promise<UpdateResult>;

	/**
	 * Create / update state.
	 * @param {CreateStateDto | UpdateStateDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: CreateStateDto | UpdateStateDto): Promise<StateEntity>;

	/**
	 * Delete state based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
