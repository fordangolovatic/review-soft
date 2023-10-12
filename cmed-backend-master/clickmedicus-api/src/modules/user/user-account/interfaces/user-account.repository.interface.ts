import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserAccountEntity } from '../entities/user-account.entity';
import { UserAccountRepository } from '../repositories/user-account.repository';
import { QueryDoctorsDto } from '@modules/doctor/dto/doctors.query.dto';
import { QueryResidentsDto } from '@modules/resident/dto/residents.query.dto';
import { UserProfileDto } from '@modules/user-profile/dto/user-profile.dto';
/**
 * A contract for [UserAccountRepository]{@link UserAccountRepository} class.
 */
export interface UserAccountRepositoryInterface
	extends BaseRepositoryInterface<UserAccountEntity> {
	/**
	 * Get a list of user profiles.
	 */
	getUserProfileList(
		// accountTypeId: number,
		userId: number
	): Promise<UserProfileDto[]>;
	getOne(id: any): Promise<UserAccountEntity>;
	getProfile(id: number);
	getResidentsInformation(query: QueryResidentsDto);
	getDoctorsInformation(query: QueryDoctorsDto);
}
