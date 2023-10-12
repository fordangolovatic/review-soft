import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountRepositoryInterface } from '@modules/user/user-account/interfaces/user-account.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ConsultationsServiceInterface } from './interfaces/consultations.service.interface';
import { CreateConsultationDto } from './dto/create-consultations.dto';
import { ConsultationsRepositoryInterface } from './interfaces/consultations.repository.interface';
import { ConsultationSessionEntity } from './consultation-session/entities/consultation-session.entity';
import { UpdateConsultationDto } from './dto/update-consultations.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A service  provider for Consultations table
 */
@Injectable()
export class ConsultationsService {
	constructor(
		// @Inject(DIToken.ACCOUNT_REPOSITORY_INTERFACE)
		// private readonly accountRepository: AccountRepositoryInterface,
		@Inject(DIToken.CONSULTATIONS_REPOSITORY_INTERFACE)
		private readonly consultationsRepository: ConsultationsRepositoryInterface
	) {}

	/**
	 * Get all consultation sessions.
	 */
	async getAllConsultationSessionsForDoctor(user: UserAccountEntity) {
		return this.consultationsRepository.getAllConsultationSessionsForDoctor(
			user
		);
	}

	create(
		data: CreateConsultationDto,
		user: UserAccountEntity
	): Promise<ConsultationSessionEntity> {
		return this.consultationsRepository.createEntity(data, user);
	}

	/**
	 * Update consultation by id.
	 * @param {consultationId} consultationId - Consultation id..
	 * @param {updateConsultationDto} updateConsultationDto - UpdateConsultationDto
	 */
	async updateById(
		consultationId: number,
		updateConsultationDto: UpdateConsultationDto
	) {
		const consultation = await this.consultationsRepository.getById(
			consultationId
		);

		Object.assign(consultation, updateConsultationDto);

		return this.consultationsRepository.save(consultation);
	}
}
