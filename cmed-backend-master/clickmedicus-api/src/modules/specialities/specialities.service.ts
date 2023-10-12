import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { SpecialitiesRepositoryInterface } from './interfaces/specialities.repository.interface';

@Injectable()
export class SpecialitiesService {
	constructor(
		@Inject(DIToken.SPECIALITIES_REPOSITORY_INTERFACE)
		private readonly specialitiesRepository: SpecialitiesRepositoryInterface
	) {}
	/**
	 * Create new speciality.
	 * @param {CreateSpecialityDto} createSpecialityDto - Data which need to be inserted in database table.
	 * @param {UserAccountEntity} user - User account entity
	 */
	async createSpeciality(
		createSpecialityDto: CreateSpecialityDto,
		user: UserAccountEntity
	) {
		return this.specialitiesRepository.createEntity(
			createSpecialityDto,
			user
		);
	}

	/**
	 * Get all specialities.
	 */
	async findAll(user: UserAccountEntity) {
		try {
			return this.specialitiesRepository.getAllSpecialities(user);
		} catch (error) {
			console.log('error', error);
		}
	}

	/**
	 * Get Specialities by id.
	 * @param {specialityId} specialityId - Article id.
	 */
	findOne(specialityId: number) {
		return this.specialitiesRepository.getById(specialityId);
	}

	/**
	 * Update Specialities by id.
	 * @param {id} id - Speciality id.
	 * @param updateSpecialitiesDto
	 */
	async update(id: number, updateSpecialitiesDto: UpdateSpecialityDto) {
		const speciality = await this.specialitiesRepository.getById(id);

		Object.assign(speciality, updateSpecialitiesDto);

		return this.specialitiesRepository.save(speciality);
	}
	/**
	 * Delete Speciality by id.
	 * @param {id} id - Speciality .
	 */

	remove(id: number) {
		return this.specialitiesRepository.deleteEntity(id);
	}
}
