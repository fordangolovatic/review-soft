import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { ProfessionalExperienceEntity } from '../../../user/user-account/entities/professional-experience.entity';
import { CreateProfessionalExperienceDto } from '../../../user/user-account/dto/create-professional-experience.dto';

@Injectable()
export class ProfessionalExperienceRepository extends BaseAbstractRepository<ProfessionalExperienceEntity> {
	constructor(
		@InjectRepository(ProfessionalExperienceEntity)
		private readonly professionalExperienceRepository: Repository<ProfessionalExperienceEntity>
	) {
		super(professionalExperienceRepository);
	}

	async createEntity(data: CreateProfessionalExperienceDto) {
		const professionalExperience =
			this.professionalExperienceRepository.create(data);

		if (data.startDate) {
			professionalExperience.startDate = data.startDate;
		}

		if (data.endDate) {
			professionalExperience.endDate = data.endDate;
		}

		await this.professionalExperienceRepository.save(
			professionalExperience
		);
	}

	async getAllEntities() {
		return this.professionalExperienceRepository.find({});
	}

	async deleteEntity(
		professionalExperienceId: number
	): Promise<DeleteResult> {
		return await this.professionalExperienceRepository.delete({
			professionalExperienceId
		});
	}
}
