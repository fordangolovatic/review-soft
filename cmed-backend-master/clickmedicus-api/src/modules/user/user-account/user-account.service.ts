import { DIToken } from '@core/enums/ditoken.enum';
import { v4 as uuidv4 } from 'uuid';
import { genSalt, hash, compare } from 'bcrypt';
import {
	HttpException,
	NotFoundException,
	HttpStatus,
	Inject,
	Injectable
} from '@nestjs/common';
import { ErrorCode } from '@core/constants/enums/errorCodes.enum';
import { SuccessCode } from '@core/constants/enums/successCodes.enum';
import {
	DeleteResult,
	FindManyOptions,
	FindOneOptions
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAccountEntity } from './entities/user-account.entity';
import { UserAccountRepositoryInterface } from './interfaces/user-account.repository.interface';
import { UserAccountServiceInterface } from './interfaces/user-account.service.interface';

import { UserProfileDto } from '@modules/user-profile/dto/user-profile.dto';
import { ActivityProgramBody } from '@modules/user/user-account/dto/account.activity-program.dto';
import { ActivityProgramRepositoryInterface } from '@modules/user/user-account/interfaces/activity-program.repository.interface';
import { CreateMedicalRecordDto } from '../../user/user-account/dto/create-medical-record.dto';
import { CreateProfessionalExperienceDto } from './dto/create-professional-experience.dto';
import { CreateProfessionalInfoDto } from './dto/create-professional-info.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { UpdateProfessionalInfoDto } from './dto/update-professional-info.dto';
import { MedicalRecordEntity } from './entities/medical-record.entity';
import { MedicalRecordRepositoryInterface } from './interfaces/medical-record.repository.interface';
import { ProfessionalExperienceRepositoryInterface } from './interfaces/professional-experience.repository.interface';
import { ProfessionalInfoRepositoryInterface } from './interfaces/professional-info.repository.interface';

/**
 * A service / provider for user master.
 */
@Injectable()
export class UserAccountService implements UserAccountServiceInterface {
	constructor(
		@Inject(DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE)
		private readonly userAccountRepository: UserAccountRepositoryInterface,
		@Inject(DIToken.MEDICAL_RECORD_REPOSITORY_INTERFACE)
		private readonly medicalRecordRepository: MedicalRecordRepositoryInterface,
		@Inject(DIToken.ACTIVITY_PROGRAM_REPOSITORY_INTERFACE)
		private readonly activityProgramRepository: ActivityProgramRepositoryInterface,
		@Inject(DIToken.PROFESSIONAL_INFO_REPOSITORY_INTERFACE)
		private readonly professionalInfoRepository: ProfessionalInfoRepositoryInterface,
		@Inject(DIToken.PROFESSIONAL_EXPERIENCE_REPOSITORY_INTERFACE)
		private readonly professionalExperienceRepository: ProfessionalExperienceRepositoryInterface
	) {}

	/**
	 * Returns a list of all the records of user.
	 */
	getAll(): Promise<UserAccountEntity[]> {
		try {
			return this.userAccountRepository.getAll();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a list of all the user profiles.
	 * @param {accountTypeId} id - an account type id.
	 * @param {userId} id - an account id.
	 */
	getAllUserProfiles(
		userId: number
	): Promise<UserProfileDto[]> {
		try {
			return this.userAccountRepository.getUserProfileList(
				userId
			);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Returns a single record of user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	getOneById(id: number): Promise<UserAccountEntity> {
		try {
			return this.userAccountRepository.getOneById({
				where: {
					userId: id
				},
				relations: {
					languages: true
				},
				select: { languages: true }
			});
		} catch (error) {
			throw new Error(ErrorCode.UNKNOWN_ERROR);
		}
	}

	/**
	 * Returns a single record of user based on the given conditions.
	 * @param {FindOneOptions} condition - Condition to apply in query.
	 */
	getOneByCondition(
		condition: FindOneOptions<any>
	): Promise<UserAccountEntity> {
		try {
			return this.userAccountRepository.getOneByCondition(condition);
		} catch (error) {
			throw new Error(ErrorCode.UNKNOWN_ERROR);
		}
	}

	/**
	 * Returns a list of records of user based on the given conditions.
	 * @param {FindManyOptions} condition - Condition to apply in query.
	 */
	
	getManyByCondition(
		condition: FindManyOptions<any>
	): Promise<UserAccountEntity[]> {
		try {
			return this.userAccountRepository.getManyByCondition(condition);
		} catch (error) {
			throw new Error(ErrorCode.UNKNOWN_ERROR);
		}
	}

	async create(data: CreateUserDto): Promise<UserAccountEntity> {
		try {
			const existingUser =
				await this.userAccountRepository.getOneByCondition({
					where: {
						email: data.email
					}
				});

			if (existingUser) {
				throw new Error(ErrorCode.EMAIL_ALREADY_REGISTERED);
			}

			const userAccountEntity: UserAccountEntity =
				new UserAccountEntity();
			userAccountEntity.userId = 0;
			userAccountEntity.firstName = data.firstName;
			userAccountEntity.lastName = data.lastName;
			userAccountEntity.username = data.username;
			userAccountEntity.email = data.email;
			userAccountEntity.password = data.password;
			userAccountEntity.accountType = data.accountType;
			userAccountEntity.isActive = data.isActive;
			userAccountEntity.profileImage = data.profileImage;
			userAccountEntity.createdBy = data.createdBy;
			userAccountEntity.createdDate = data.createdDate;
			userAccountEntity.postalCode = data.postalCode;
			userAccountEntity.isTranslator = data.isTranslator;
			userAccountEntity.dateOfBirth = data.dateOfBirth;
			userAccountEntity.modifiedBy = null;
			userAccountEntity.modifiedDate = null;
			userAccountEntity.isSystem = data.isSystem;
			userAccountEntity.isConfirmed = data.isConfirmed;
			return this.userAccountRepository.create(userAccountEntity);
		} catch (error) {
			throw new Error(ErrorCode.UNKNOWN_ERROR);
		}
	}

	/**
	 * Update record(s).
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateUserDto} data - Data which need to be updated in database table.
	 */
	async update(id: number, data: UpdateUserDto): Promise<UserAccountEntity> {
		try {
			const userAccountEntity: UserAccountEntity =
				await this.userAccountRepository.getOne(id);

			userAccountEntity.firstName = data.firstName;
			userAccountEntity.lastName = data.lastName;
			userAccountEntity.modifiedDate = new Date(data.modifiedDate);
			userAccountEntity.description = data.description;
			userAccountEntity.cityId = data.cityId;
			userAccountEntity.countryId = data.countryId;
			userAccountEntity.stateId = data.stateId;
			userAccountEntity.dateOfBirth = data.dateOfBirth;
			userAccountEntity.address = data.address;
			userAccountEntity.profileImage = data.profileImage;
			userAccountEntity.languages = data.languages;

			return await this.userAccountRepository.saveChanges(
				userAccountEntity
			);
		} catch (error) {
			throw new Error(ErrorCode.UNKNOWN_ERROR);
		}
	}

	/**
	 * Create / update user.
	 * @param {CreateUserDto | UpdateUserDto} data - Data which need to be stored in database table.
	 */
	saveChanges(
		data: CreateUserDto | UpdateUserDto
	): Promise<UserAccountEntity> {
		try {
			return this.userAccountRepository.saveChanges(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete user based on the given user id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.userAccountRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}

	async createProfessionalExperience(body: CreateProfessionalExperienceDto) {
		await this.professionalExperienceRepository.createEntity(body);
	}

	async deleteProfessionalExperience(id: number): Promise<void> {
		const result: DeleteResult =
			await this.professionalExperienceRepository.deleteEntity(id);

		if (!result.affected) {
			throw new HttpException(
				ErrorCode.INVARID_ID_ERROR,
				HttpStatus.NOT_FOUND
			);
		}
	}

	async deleteProfessionalInfo(id: number): Promise<void> {
		const result: DeleteResult =
			await this.professionalInfoRepository.deleteEntity(id);

		if (!result.affected) {
			throw new HttpException(
				ErrorCode.VALIDATION_ERROR,
				HttpStatus.NOT_FOUND
			);
		}
	}

	async createProfessionalInfo(
		body: CreateProfessionalInfoDto,
		user: UserAccountEntity
	) {
		return this.professionalInfoRepository.createEntity(body, user);
	}

	async getProfessionalInfo(user: UserAccountEntity) {
		return this.professionalInfoRepository.getOne(user.userId);
	}
	async getProfessionalExperience(user: UserAccountEntity) {
		return this.professionalExperienceRepository.getAll();
	}
	async updateProfessionalInfo(
		body: UpdateProfessionalInfoDto,
		user: UserAccountEntity
	) {
		const userAccount = await this.userAccountRepository.getOne(
			user.userId
		);

		if (!userAccount.professionalInfo) {
			return this.createProfessionalInfo(body, user);
		}

		return this.professionalInfoRepository.updateEntity(
			body,
			userAccount.professionalInfo.professionalInfoId
		);
	}

	/**
	 ***************** Medical record *************
	 */

	async createMedicalRecord(
		data: CreateMedicalRecordDto,
		user: UserAccountEntity
	) {
		return this.medicalRecordRepository.createEntity(data, user);
	}

	async getMedicalRecordByUserId(id: number): Promise<MedicalRecordEntity> {
		const userAccount = await this.userAccountRepository.getOne(id);
		if (!userAccount.medicalRecord) {
			throw new HttpException(ErrorCode.MEDICAL_RECORD_NOT_FOUND, 404);
		}

		return this.medicalRecordRepository.getEntity(
			userAccount.medicalRecord.medicalRecordId
		) as Promise<MedicalRecordEntity>;
	}

	async getMedicalRecord(user: UserAccountEntity) {
		const userAccount = await this.userAccountRepository.getOne(
			user.userId
		);

		if (!userAccount.medicalRecord) {
			throw new HttpException(ErrorCode.MEDICAL_RECORD_NOT_FOUND, 404);
		}

		return this.medicalRecordRepository.getEntity(
			userAccount.medicalRecord.medicalRecordId
		);
	}

	async updateMedicalRecord(
		user: UserAccountEntity,
		data: UpdateMedicalRecordDto
	) {
		const userAccount = await this.userAccountRepository.getOne(
			user.userId
		);

		if (!userAccount.medicalRecord) {
			throw new HttpException(ErrorCode.MEDICAL_RECORD_NOT_FOUND, 404);
		}

		return this.medicalRecordRepository.updateEntity(
			userAccount.medicalRecord.medicalRecordId,
			data
		);
	}

	/**
	 ***************** Activity Program *************
	 */

	/** Adds an activity program entry to the logged-in user's account.
	 * @param userId The ID of the logged-in user.
	 * @param body The activity program data to be added.
	 */
	async createActivity(
		userId: number,
		body: ActivityProgramBody
	): Promise<void> {
		return this.activityProgramRepository.createActivityProgram(
			body,
			userId
		);
	}

	/** Updates an activity program entry in the logged-in user's account.
	 * @param body The activity program data to be updated.
	 */
	async updateActivityProgram(body: ActivityProgramBody): Promise<void> {
		return this.activityProgramRepository.updateActivityProgram(body);
	}

	/**
	 * Retrieves the activity program entries for logged-in user's account.
	 * @param userId The ID of the logged-in user.
	 */
	async getActivityProgram(userId: number): Promise<ActivityProgramBody> {
		return this.activityProgramRepository.getActivityProgram(userId);
	}

	/**
	 * Change  user Password of logged-in user's account.
	 * @Body oldPassword and  newPassword .
	 */
	async changePassword(data: any, user: UserAccountEntity): Promise<any> {
		try {
			const userAccount = await this.userAccountRepository.getOneById({
				where: {
					userId: user.userId
				},
				select: {
					userId: true,
					firstName: true,
					lastName: true,
					username: true,
					email: true,
					password: true,
					accountType: true,
					isActive: true,
					isAdmin: true,
					profileImage: true,
					createdBy: true,
					createdDate: true,
					description: true,
					modifiedBy: true,
					modifiedDate: true,
					isSystem: true,
					isConfirmed: true
				}
			});

			if (!userAccount) {
				throw new NotFoundException();
			}

			const passwordMatch = await compare(
				data.oldPassword,
				userAccount.password
			);

			if (!passwordMatch) {
				throw new Error(ErrorCode.INCORRECT_OLD_PASSWORD);
			}

			userAccount.password = await hash(
				data.newPassword,
				await genSalt(10)
			);

			userAccount.modifiedDate = new Date();
			const passwordChanged =
				await this.userAccountRepository.saveChanges(userAccount);

			if (!passwordChanged) {
				throw new Error(ErrorCode.PASSWORD_UPDATE_FAILED);
			}

			return { success: SuccessCode.PASSWORD_UPDATED };
		} catch (error) {
			throw error;
		}
	}
	async generatePasswordResetToken(
		email: string
	): Promise<UserAccountEntity> {
		const token = uuidv4();
		const expirationTimeInMillisceconds = 3_600_000;
		const expirationTimestamp = Date.now() + expirationTimeInMillisceconds;
		const userAccount = await this.userAccountRepository.getOneById({
			where: {
				email: email
			}
		});

		// Store the token and expiration times in your database
		userAccount.passwordResetToken = token;
		userAccount.passwordResetTokenExpires = new Date(expirationTimestamp);
		const resetTokenSaved = await this.userAccountRepository.saveChanges(
			userAccount
		);
		return resetTokenSaved;
	}

	async forgotPassword(email: string): Promise<UserAccountEntity> {
		const userAccount = await this.userAccountRepository.getOneById({
			where: {
				email
			}
		});
		if (!userAccount) {
			throw new NotFoundException(ErrorCode.NOT_FOUND);
		}

		const resetToken = await this.generatePasswordResetToken(email);
		return resetToken;
	}

	async resetPassword(
		token: string,
		newPassword: string
	): Promise<{ success: string }> {
		try {
			const userAccount = await this.userAccountRepository.getOneById({
				where: {
					passwordResetToken: token
				}
			});

			if (
				!userAccount ||
				userAccount.passwordResetTokenExpires <= new Date()
			) {
				throw new NotFoundException(ErrorCode.NOT_FOUND);
			}

			if (userAccount) {
				userAccount.password = await hash(
					newPassword,
					await genSalt(10)
				);
			}

			userAccount.passwordResetToken = null;
			userAccount.passwordResetTokenExpires = null;
			userAccount.modifiedDate = new Date();
			const passwordChanged =
				await this.userAccountRepository.saveChanges(userAccount);

			if (!passwordChanged) {
				throw new Error(ErrorCode.PASSWORD_UPDATE_FAILED);
			}

			return { success: SuccessCode.PASSWORD_UPDATED };
		} catch (error) {
			throw error;
		}
	}
}
