import { CreateConsultationDto } from '../dto/create-consultations.dto';
import { UpdateConsultationDto } from '../dto/update-consultations.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A service contract which must be implemented by [ConsultationService]{@link ConsultationService}.
 */
export interface ConsultationsServiceInterface {
	getAllConsultationSessionsForDoctor(user: UserAccountEntity);

	create(data: CreateConsultationDto, user: UserAccountEntity);

	getById(id: number);

	updateById(id: number, updateConsultateDto: UpdateConsultationDto);
}
