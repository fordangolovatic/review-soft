import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { SpecialityEntity } from '../entities/speciality.entity';
import { CreateSpecialityDto } from '../dto/create-speciality.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A contract for [SpecialityRepository]{@link SpecialitiesRepository} class.
 */
export interface SpecialitiesRepositoryInterface
	extends BaseRepositoryInterface<SpecialityEntity> {
	getById(specialityId: number): Promise<SpecialityEntity>;

	getAllSpecialities(user: UserAccountEntity): Promise<any>;

	save(specialityEntity: SpecialityEntity): Promise<any>;

	createEntity(
		createSpecialityDto: CreateSpecialityDto,
		user: UserAccountEntity
	): Promise<SpecialityEntity>;

	deleteEntity(specialityId: number): Promise<any>;
}
