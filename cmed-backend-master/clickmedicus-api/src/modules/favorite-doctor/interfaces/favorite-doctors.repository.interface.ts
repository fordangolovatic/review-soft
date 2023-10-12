import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { FavoriteDoctorEntity } from '../entities/favorite-doctor.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateFavoriteDoctorDto } from '../dto/create-favorite-doctor.dto';

/**
 * A contract for [FavoriteDoctorsRepository]{@link FavoriteDoctorsRepository} class.
 */
export interface FavoriteDoctorsRepositoryInterface
	extends BaseRepositoryInterface<FavoriteDoctorEntity> {
	getAllFavoriteDoctors(user: UserAccountEntity): Promise<any>;
	createEntity(
		createFavoriteDoctorDto: CreateFavoriteDoctorDto
	): Promise<FavoriteDoctorEntity>;
}
