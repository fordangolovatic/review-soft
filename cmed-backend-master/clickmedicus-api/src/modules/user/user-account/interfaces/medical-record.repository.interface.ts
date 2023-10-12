import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateMedicalRecordDto } from '../../../user/user-account/dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { MedicalRecordEntity } from '../entities/medical-record.entity';

/**
 * A contract for [MedicalRecordRepository]{@link MedicalRecordRepository} class.
 */
export interface MedicalRecordRepositoryInterface
	extends BaseRepositoryInterface<MedicalRecordEntity> {
	createEntity(data: CreateMedicalRecordDto, user: UserAccountEntity);
	updateEntity(id: number, data: UpdateMedicalRecordDto);
	getEntity(id: number);
}
