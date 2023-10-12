import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { CurrencyRepositoryInterface } from './interfaces/currency.repository.interface';
import { CurrencyServiceInterface } from './interfaces/currency.service.interface';

import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CurrencyEntity } from './entities/currency.entity';

/**
 * A service / provider for currency table.
 */
@Injectable()
export class CurrencyService implements CurrencyServiceInterface {
	constructor(
		@Inject(DIToken.CURRENCY_REPOSITORY_INTERFACE)
		private readonly currencyRepository: CurrencyRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of currency.
	 */
	getAll(): Promise<CurrencyEntity[]> {
		try {
			return this.currencyRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of currency based on the given currency id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CurrencyEntity> {
		try {
			return this.currencyRepository.getOneById({
				where: {
					currencyId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of currency based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CurrencyEntity> {
		try {
			return this.currencyRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of currency based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<CurrencyEntity[]> {
		try {
			return this.currencyRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create new currency.
	 * @param {CreateCurrencyDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCurrencyDto): Promise<CurrencyEntity> {
		try {
			return this.currencyRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update an existing currency
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCurrencyDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCurrencyDto): Promise<UpdateResult> {
		try {
			return this.currencyRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update currency
	 * @param {CreateCurrencyDto | UpdateCurrencyDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateCurrencyDto | UpdateCurrencyDto
	): Promise<CurrencyEntity> {
		try {
			return this.currencyRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete currency based on the given currency id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.currencyRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
