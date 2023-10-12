import { Injectable, Inject } from '@nestjs/common';
import { CreateFavoriteDoctorDto } from './dto/create-favorite-doctor.dto';
import { FavoriteDoctorEntity } from './entities/favorite-doctor.entity';
import { FavoriteDoctorsServiceInterface } from './interfaces/favorite-doctors.service.interface';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { FavoriteDoctorsRepositoryInterface } from './interfaces/favorite-doctors.repository.interface';
import { DeleteResult, FindManyOptions } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

@Injectable()
export class FavoriteDoctorsService implements FavoriteDoctorsServiceInterface {
	constructor(
		@Inject(DIToken.FAVORITE_DOCTORS_REPOSITORY_INTERFACE)
		private readonly favoriteDoctorsRepository: FavoriteDoctorsRepositoryInterface
	) {}
	/**
	 * Returns a list of all the records of favorite doctors.
	 */
	getAll(user: UserAccountEntity): Promise<FavoriteDoctorEntity[]> {
		try {
			return this.favoriteDoctorsRepository.getAllFavoriteDoctors(user);
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Create record(s).
	 * @param {CreateFavoriteDoctorDto} data - Data which need to be inserted in database table.
	 */
	createFavoriteDoctor(
		data: CreateFavoriteDoctorDto,
		user: UserAccountEntity
	): Promise<FavoriteDoctorEntity> {
		try {
			data.createdBy = user;
			return this.favoriteDoctorsRepository.createEntity(data);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete favorite doctors based on the given favorite doctor id.
	 * @param {number} id - a unique id / primary key.
	 */
	delete(id: number): Promise<DeleteResult> {
		try {
			return this.favoriteDoctorsRepository.delete(id);
		} catch (error) {
			throw error;
		}
	}
}
