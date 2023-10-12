import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { StateRepositoryInterface } from './interfaces/state.repository.interface';
import { StateServiceInterface } from './interfaces/state.service.interface';

import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateEntity } from './entities/state.entity';

/**
 * A service / provider for state table.
 */
@Injectable()
export class StateService implements StateServiceInterface {
	constructor(
		@Inject(DIToken.STATE_REPOSITORY_INTERFACE)
		private readonly stateRepository: StateRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of state.
	 */
	getAll(): Promise<StateEntity[]> {
		try {
			return this.stateRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of state based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<StateEntity> {
		try {
			return this.stateRepository.getOneById({
				where: {
					stateId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of state based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<StateEntity> {
		try {
			return this.stateRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of state based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<StateEntity[]> {
		try {
			return this.stateRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create new state.
	 * @param {CreateStateDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateStateDto): Promise<StateEntity> {
		try {
			return this.stateRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update an existing state
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateStateDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateStateDto): Promise<UpdateResult> {
		try {
			return this.stateRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update state
	 * @param {CreateStateDto | UpdateStateDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: CreateStateDto | UpdateStateDto): Promise<StateEntity> {
		try {
			return this.stateRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete state based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.stateRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
