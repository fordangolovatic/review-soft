import { DeleteResult, FindManyOptions, FindOneOptions } from 'typeorm';

import { UserProfileDto } from '@modules/user-profile/dto/user-profile.dto';
import { ActivityProgramBody } from '@modules/user/user-account/dto/account.activity-program.dto';
import { CreateMedicalRecordDto } from '../../../user/user-account/dto/create-medical-record.dto';
import { CreateProfessionalExperienceDto } from '../dto/create-professional-experience.dto';
import { CreateProfessionalInfoDto } from '../dto/create-professional-info.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { UpdateProfessionalInfoDto } from '../dto/update-professional-info.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { MedicalRecordEntity } from '../entities/medical-record.entity';
import { UserAccountEntity } from '../entities/user-account.entity';
import { UpdatePasswordDto } from '../dto/update-password.dto';

/**
 * A service contract which must be implemented by [UserAccountService].
 */
export interface UserAccountServiceInterface {
	/**
	 * Returns a list of all the records of user.
	 */
	getAll(): Promise<UserAccountEntity[]>;

	/**
	 * Returns a list of all the user profiles.
	 * @param {accountTypeId} id - an account type id.
	 * @param {userId} id - an account id.
	 */

	getAllUserProfiles(
		// accountTypeId: number,
		userId: number
	): Promise<UserProfileDto[]>;

	/**
	 * Returns a single record of user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserAccountEntity>;

	/**
	 * Returns a single record of user based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<UserAccountEntity>;

	/**
	 * Returns a list of records of user based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserAccountEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateUserDto} data - Data which need to be inserted in database table.
	 */
	create(data: CreateUserDto): Promise<UserAccountEntity>;

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateUserDto} data - Data which need to be updated in database table.
	 */
	update(id: number, data: UpdateUserDto): Promise<UserAccountEntity>;

	/**
	 * Create / update user.
	 * @param {CreateUserDto | UpdateUserDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateUserDto | UpdateUserDto
	): Promise<UserAccountEntity>;

	/**
	 * Delete user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;

	getMedicalRecordByUserId(id: number): Promise<MedicalRecordEntity>;

	getMedicalRecord(user: UserAccountEntity);

	createMedicalRecord(data: CreateMedicalRecordDto, user: UserAccountEntity);

	updateMedicalRecord(user: UserAccountEntity, data: UpdateMedicalRecordDto);

	getActivityProgram(userId: number): Promise<ActivityProgramBody>;

	createActivity(userId: number, data: ActivityProgramBody): void;

	updateActivityProgram(data: ActivityProgramBody): void;

	getProfessionalExperience(user: UserAccountEntity);

	createProfessionalExperience(body: CreateProfessionalExperienceDto);

	deleteProfessionalExperience(id: number): Promise<void>;

	getProfessionalInfo(user: UserAccountEntity);

	createProfessionalInfo(
		body: CreateProfessionalInfoDto,
		user: UserAccountEntity
	);

	updateProfessionalInfo(
		body: UpdateProfessionalInfoDto,
		user: UserAccountEntity
	);

	deleteProfessionalInfo(id: number): Promise<void>;

	changePassword(
		data: UpdatePasswordDto,
		user: UserAccountEntity
	): Promise<any>;

	forgotPassword(email: string): Promise<UserAccountEntity>;

	resetPassword(
		email: string,
		newPassword: string
	): Promise<{ success: string }>;
}
