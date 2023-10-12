import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { DeleteResult } from 'typeorm';
import { ProfessionalExperienceEntity } from '../entities/professional-experience.entity';

/**
 * A contract for [AccountRepository]{@link ProfessionalExperienceRepository} class.
 */
export interface ProfessionalExperienceRepositoryInterface
	extends BaseRepositoryInterface<ProfessionalExperienceEntity> {
	createEntity(data: any);

	deleteEntity(id: number): Promise<DeleteResult>;
}
