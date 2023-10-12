import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateSpecialityDto } from '../dto/create-speciality.dto';
import { UpdateSpecialityDto } from '../dto/update-speciality.dto';

/**
 * A service contract which must be implemented by [SpecialitiesService]{@link SpecialitiesService}.
 */
export interface SpecialitiesServiceInterface {
	createSpeciality(
		createSpecialityDto: CreateSpecialityDto,
		user: UserAccountEntity
	);

	findAll(user: UserAccountEntity);

	remove(id: number);

	findOne(id: number);

	deleteById(id: number);

	update(id: number, updateSpecialityDto: UpdateSpecialityDto);
}
