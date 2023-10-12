import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateProfessionalInfoDto } from '../dto/create-professional-info.dto';
import { UpdateProfessionalInfoDto } from '../dto/update-professional-info.dto';
import { ProfessionalInfoEntity } from '../entities/professional-info.entity';
import { ProfessionalInfoRepository } from '../repositories/professional-info.repository';
import { DeleteResult } from 'typeorm';

/**
 * A contract for [ProfessionalInfoRepository]{@link ProfessionalInfoRepository} class.
 */
export interface ProfessionalInfoRepositoryInterface
	extends BaseRepositoryInterface<ProfessionalInfoEntity> {
	createEntity(
		data: CreateProfessionalInfoDto,
		user: UserAccountEntity
	): Promise<ProfessionalInfoEntity>;

	updateEntity(
		body: UpdateProfessionalInfoDto,
		professionalInfoId: number
	): Promise<ProfessionalInfoEntity>;

	deleteEntity(id: number): Promise<DeleteResult>;

	getOne(id: number): Promise<ProfessionalInfoEntity>;
}
