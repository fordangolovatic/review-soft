import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { AccountType } from '@core/constants/enums/accountType.enum';
import { ConsultationStatusEnum } from '@core/constants/enums/consultationStatus.enum';
import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsultationSessionEntity } from '../consultation-session/entities/consultation-session.entity';
import { CreateConsultationDto } from '../dto/create-consultations.dto';
import { ConsultationsRepositoryInterface } from '../interfaces/consultations.repository.interface';

/**
 * A repository for Consultation session  table.
 */
@Injectable()
export class ConsultationsRepository
	extends BaseAbstractRepository<ConsultationSessionEntity>
	implements ConsultationsRepositoryInterface
{
	constructor(
		@InjectRepository(ConsultationSessionEntity)
		private consultationRepository: Repository<ConsultationSessionEntity>,
		@InjectRepository(UserAccountEntity)
		private userAccountRespository: Repository<UserAccountEntity>,
		@InjectRepository(ActivityProgramEntity)
		private activityProgramRepository: Repository<ActivityProgramEntity>
	) {
		super(consultationRepository);
	}

	async getAllConsultationSessionsForDoctor(
		user: UserAccountEntity
	): Promise<any> {
		const userAccount = await this.userAccountRespository.findOne({
			where: { userId: user.userId }
		});

		const allConsultations = await this.consultationRepository.find({
			where: {
				...(userAccount.accountType === AccountType.DOCTOR
					? { doctor: { userId: user.userId } }
					: { patient: { userId: user.userId } })
			},
			relations: {
				doctor: true,
				cancelledBy: true,
				patient: true,
				activity: true
			}
		});

		return allConsultations;
	}

	async createEntity(
		data: CreateConsultationDto,
		user: UserAccountEntity
	): Promise<ConsultationSessionEntity> {
		const consultation = this.consultationRepository.create();

		const patient = await this.userAccountRespository.findOne({
			where: {
				userId: user.userId,
				accountType: AccountType.PATIENT
			}
		});
		if (!patient)
			throw Error('Id of patient you specified does not exisit!');

		const doctor = await this.userAccountRespository.findOne({
			where: {
				userId: data.doctorId,
				accountType: AccountType.DOCTOR
			}
		});
		if (!doctor) throw Error('Id of doctor you specified does not exisit!');

		const activity = await this.activityProgramRepository.findOne({
			where: { id: data.activityId }
		});
		if (!activity) throw Error('Invalid activity connection');

		consultation.activity = activity;
		consultation.patient = patient;
		consultation.doctor = doctor;
		consultation.consultationStatus =
			data.consultationStatus || ConsultationStatusEnum.PENDING;
		consultation.consultationPrice = data.consultationPrice;
		consultation.startTime = data.startTime;
		consultation.endTime = data.endTime;
		consultation.chatStartTime = data.chatStartTime;
		consultation.chatEndTime = data.chatEndTime;
		consultation.rating = data.rating;
		consultation.feedback = data.feedback;
		consultation.treatmentPlan = data.treatmentPlan;
		consultation.comments = data.comments;
		consultation.cancelledBy = null;
		consultation.reasonForCancellation = data.reasonForCancellation;
		consultation.translatorConsultationPrice =
			data.translatorConsultationPrice;
		consultation.isInterpretation = data.isInterpretation;
		consultation.medicalRecordAgreement = data.medicalRecordAgreement;
		consultation.image = data.image;
		return this.consultationRepository.save(consultation);
	}

	async save(consultationEntity: ConsultationSessionEntity) {
		return this.consultationRepository.save(consultationEntity);
	}

	async getById(consultationId: number): Promise<ConsultationSessionEntity> {
		return this.consultationRepository.findOne({
			where: { consultationSessionId: consultationId }
		});
	}
}
