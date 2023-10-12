import { Inject, Injectable } from '@nestjs/common';

import {
	DeleteResult,
	FindManyOptions,
	FindOneOptions,
	UpdateResult
} from 'typeorm';

import { DIToken } from '@core/enums/ditoken.enum';

import { LanguageRepositoryInterface } from './interfaces/language.repository.interface';
import { LanguageServiceInterface } from './interfaces/language.service.interface';

import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageEntity } from './entities/language.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A service / provider for language table.
 */
@Injectable()
export class LanguageService implements LanguageServiceInterface {
	constructor(
		@Inject(DIToken.LANGUAGE_REPOSITORY_INTERFACE)
		private readonly languageRepository: LanguageRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of language.
	 */
	getAll(): Promise<LanguageEntity[]> {
		try {
			return this.languageRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of language based on the given language id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<LanguageEntity> {
		try {
			return this.languageRepository.getOneById({
				where: {
					languageId: id
				}
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of language based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<LanguageEntity> {
		try {
			return this.languageRepository.getOneByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of records of language based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<LanguageEntity[]> {
		try {
			return this.languageRepository.getManyByCondition(condition);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create new language.
	 * @param {CreateLanguageDto} data - Data which need to be inserted in database table.
	 */
	async create(
		data: CreateLanguageDto,
		user: UserAccountEntity
	): Promise<LanguageEntity> {
		try {
			return this.languageRepository.createEntity(data, user);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Update an existing language
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateLanguageDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateLanguageDto): Promise<UpdateResult> {
		try {
			return this.languageRepository.update(id, data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Create / update language
	 * @param {CreateLanguageDto | UpdateLanguageDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateLanguageDto | UpdateLanguageDto
	): Promise<LanguageEntity> {
		try {
			return this.languageRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete language based on the given language id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.languageRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
