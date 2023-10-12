import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { ConsultationSessionEntity } from '../consultation-session/entities/consultation-session.entity';
import { CreateConsultationDto } from '../dto/create-consultations.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
/**
 * A contract for [ConsultationRepository]{@link ConsultationRepository} class.
 */
export interface ConsultationsRepositoryInterface
	extends BaseRepositoryInterface<ConsultationSessionEntity> {
	getAllConsultationSessionsForDoctor(user: UserAccountEntity): Promise<any>;

	createEntity(
		createArticleDto: CreateConsultationDto,
		user: UserAccountEntity
	): Promise<ConsultationSessionEntity>;

	getById(conslutationId: number): Promise<ConsultationSessionEntity>;

	save(consultationEntity: ConsultationSessionEntity): Promise<any>;
}
