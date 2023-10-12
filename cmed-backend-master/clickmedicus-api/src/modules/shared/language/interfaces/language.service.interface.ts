import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { DeleteResult, FindManyOptions, FindOneOptions, UpdateResult } from 'typeorm';

import { CreateLanguageDto } from '../dto/create-language.dto';
import { UpdateLanguageDto } from '../dto/update-language.dto';
import { LanguageEntity } from '../entities/language.entity';

/**
 * A service contract which must be implemented by [LanguageService]{@link LanguageService}.
 */
export interface LanguageServiceInterface {
	/**
	 * Returns a list of all the records of language.
	 */
	getAll(): Promise<LanguageEntity[]>;

	/**
	 * Returns a single record of language based on the given language id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<LanguageEntity>;

	/**
	 * Returns a single record of language based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(condition: FindOneOptions<any>): Promise<LanguageEntity>;

	/**
	 * Returns a list of records of language based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<LanguageEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateLanguageDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateLanguageDto, userAccountEntity: UserAccountEntity): Promise<LanguageEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateLanguageDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateLanguageDto): Promise<UpdateResult>;

	/**
	 * Create / update language.
	 * @param {CreateLanguageDto | UpdateLanguageDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateLanguageDto | UpdateLanguageDto
	): Promise<LanguageEntity>;

	/**
	 * Delete language based on the given language id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
