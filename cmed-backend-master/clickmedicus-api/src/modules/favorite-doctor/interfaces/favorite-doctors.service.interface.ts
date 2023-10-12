import { DeleteResult, FindManyOptions } from 'typeorm';
import { CreateFavoriteDoctorDto } from '../dto/create-favorite-doctor.dto';
import { FavoriteDoctorEntity } from '../entities/favorite-doctor.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A service contract which must be implemented by [FavoriteDoctorsService]{@link FavoriteDoctorsService}.
 */
export interface FavoriteDoctorsServiceInterface {
	/**
	 * Returns a list of all the records of favorite doctors.
	 */
	getAll(user: UserAccountEntity): Promise<FavoriteDoctorEntity[]>;

	/**
	 * Create record(s).
	 * @param {CreateFavoriteDoctorDto } data - Data which need to be inserted in database table.
	 */
	createFavoriteDoctor(
		data: CreateFavoriteDoctorDto,
		user: UserAccountEntity
	): Promise<FavoriteDoctorEntity>;

	/**
	 * Delete feature group based on the given favorite doctor id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult>;
}
