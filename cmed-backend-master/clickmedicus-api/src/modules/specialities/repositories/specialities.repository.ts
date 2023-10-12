import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { SpecialitiesRepositoryInterface } from '../interfaces/specialities.repository.interface';
import { SpecialityEntity } from '../entities/speciality.entity';
import { CreateSpecialityDto } from '../dto/create-speciality.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { AccountType } from '@core/constants/enums/accountType.enum';
import { generateRandomID } from '@utils/generateRandomId';

/**
 * A repository for specialities table.
 */

@Injectable()
export class SpecialitiesRepository
	extends BaseAbstractRepository<SpecialityEntity>
	implements SpecialitiesRepositoryInterface
{
	constructor(
		@InjectRepository(SpecialityEntity)
		private readonly specialitiesRepository: Repository<SpecialityEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>
	) {
		super(specialitiesRepository);
	}

	async getById(specialityId: number): Promise<SpecialityEntity> {
		return this.specialitiesRepository.findOne({
			where: { specialityId: specialityId }
		});
	}

	async createEntity(
		CreateSpecialityDto: CreateSpecialityDto,
		user: UserAccountEntity
	): Promise<SpecialityEntity> {
		const doctor = await this.userAccountRepository.findOne({
			where: { userId: user.userId, accountType: AccountType.DOCTOR }
		});
		if (!doctor) {
			throw Error('Only doctor can create speciality');
		}
		const speciality = this.specialitiesRepository.create();
		speciality.specialityId = generateRandomID();
		speciality.specialityName = CreateSpecialityDto.speciality;
		speciality.image = CreateSpecialityDto.image;
		speciality.createdBy = doctor;
		return this.specialitiesRepository.save(speciality);
	}

	async getAllSpecialities(user: UserAccountEntity): Promise<any> {
		const specialities = await this.specialitiesRepository.find({
			// where: [{ createdBy: { userId: user.userId } }]
			relations: {
				createdBy: {
					activityProgram: true
				}
			}
		});

		return specialities;
	}

	async save(categoryEntity: SpecialityEntity): Promise<SpecialityEntity> {
		return this.specialitiesRepository.save(categoryEntity);
	}

	async deleteEntity(specialityId: number): Promise<DeleteResult> {
		return this.specialitiesRepository.delete({
			specialityId: specialityId
		});
	}
}
