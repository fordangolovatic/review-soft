import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';
import { FavoriteDoctorEntity } from '../entities/favorite-doctor.entity';

/**
 * A DTO class for favorite doctor
 */
export class CreateFavoriteDoctorDto {
	/**
	 * User id of favorite doctor.
	 */
	@IsOptional()
	@IsPositive()
	@IsInt()
	doctorId: number;

	/**
	 * User id of a user who created the record.
	 */
	@IsOptional()
	@IsInt()
	@IsPositive()
	createdBy: UserAccountEntity;
}
