import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';

import { MedicalRecordRepositoryInterface } from '../interfaces/medical-record.repository.interface';
import {
	DrinkingStatus,
	MedicalRecordEntity
} from '../entities/medical-record.entity';
import { CreateMedicalRecordDto } from '../../../user/user-account/dto/create-medical-record.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';

@Injectable()
export class MedicalRecordRepository
	extends BaseAbstractRepository<MedicalRecordEntity>
	implements MedicalRecordRepositoryInterface
{
	constructor(
		@InjectRepository(MedicalRecordEntity)
		private readonly medicalRecordRepository: Repository<MedicalRecordEntity>
	) {
		super(medicalRecordRepository);
	}

	async createEntity(data: CreateMedicalRecordDto, user: UserAccountEntity) {
		const medicalRecord = this.medicalRecordRepository.create(data);
		medicalRecord.user = user;
		await this.medicalRecordRepository.save(medicalRecord);
	}

	async updateEntity(id: number, data: UpdateMedicalRecordDto) {
		const medicalRecord = await this.medicalRecordRepository.findOne({
			where: { medicalRecordId: id }
		});

		Object.assign(medicalRecord, data);

		await this.medicalRecordRepository.save(medicalRecord);
	}

	async getEntity(id: number) {
		const medicalRecord = await this.medicalRecordRepository.findOne({
			where: { medicalRecordId: id }
		});
		if (medicalRecord) {
			return medicalRecord;
		}
	}
}
