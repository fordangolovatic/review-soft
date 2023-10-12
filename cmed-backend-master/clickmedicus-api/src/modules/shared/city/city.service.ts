import { Inject, Injectable } from '@nestjs/common';

import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { CityRepositoryInterface } from './interfaces/city.repository.interface';
import { CityServiceInterface } from './interfaces/city.service.interface';

import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

/**
 * A service / provider for city table.
 */
@Injectable()
export class CityService implements CityServiceInterface {
	constructor(
		@Inject(DIToken.CITY_REPOSITORY_INTERFACE)
		private readonly cityRepository: CityRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of city.
	 */
	getAll(): Promise<CityEntity[]> {
		try {
			return this.cityRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of city based on the given city id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<CityEntity> {
		try {
			return this.cityRepository.getOneById({
				where: {
					cityId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of city based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<CityEntity> {
		try {
			return this.cityRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of city based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(condition: FindManyOptions<any>): Promise<CityEntity[]> {
		try {
			return this.cityRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create new city.
	 * @param {CreateCityDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateCityDto): Promise<CityEntity> {
		try {
			return this.cityRepository.create(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update an existing city
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCityDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateCityDto): Promise<UpdateResult> {
		try {
			return this.cityRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update city
	 * @param {CreateCityDto | UpdateCityDto} data - Data which need to be stored in database table.
	 */
	saveChanges(data: CreateCityDto | UpdateCityDto): Promise<CityEntity> {
		try {
			return this.cityRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete city based on the given city id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.cityRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
