import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';

import { ProfessionalInfoEntity } from '../entities/professional-info.entity';
import { CreateProfessionalInfoDto } from '../dto/create-professional-info.dto';
import { ProfessionalExperienceEntity } from '@modules/user/user-account/entities/professional-experience.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { UpdateProfessionalInfoDto } from '../dto/update-professional-info.dto';
import { UpdateProfessionalExperienceDto } from '@modules/user/user-account/dto/update-professional-experience.dto';

/**
 * A repository for account table.
 */
@Injectable()
export class ProfessionalInfoRepository extends BaseAbstractRepository<ProfessionalInfoEntity> {
	constructor(
		@InjectRepository(ProfessionalInfoEntity)
		private readonly professionalInfoRepository: Repository<ProfessionalInfoEntity>,
		@InjectRepository(ProfessionalExperienceEntity)
		private readonly professionalExperienceRepository: Repository<ProfessionalExperienceEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>,
		@InjectRepository(SpecialityEntity)
		private readonly specialitiesRepository: Repository<SpecialityEntity>
	) {
		super(professionalInfoRepository);
	}

	updateOrCreateProfessionalExperiences = async (
		professionalExperiences: UpdateProfessionalExperienceDto[]
	) => {
		const updatedProfessionalExperiences = [];

		for (let i = 0; i < professionalExperiences?.length; i += 1) {
			const {
				professionalExperienceId,
				...professionalExperienceValues
			} = professionalExperiences[i];

			if (professionalExperienceId) {
				// eslint-disable-next-line no-await-in-loop
				await this.professionalExperienceRepository.update(
					{
						professionalExperienceId: professionalExperienceId
					},
					professionalExperienceValues
				);
				updatedProfessionalExperiences.push({
					professionalExperienceId,
					...professionalExperienceValues
				});
			} else {
				const professionalExperience =
					await this.professionalExperienceRepository.create({
						...professionalExperienceValues,
						startDate: professionalExperienceValues?.startDate,
						endDate: professionalExperienceValues?.endDate
					});

				const newProfessionalExperience = await this.professionalExperienceRepository.save(
						professionalExperience
					);
				updatedProfessionalExperiences.push(newProfessionalExperience);
			}
		}

		return updatedProfessionalExperiences;
	};

	async createEntity(
		data: CreateProfessionalInfoDto,
		user: UserAccountEntity
	): Promise<ProfessionalInfoEntity> {
		const professionalInformation =
			await this.professionalInfoRepository.findOne({
				where: { user: { userId: user?.userId } },
				relations: {
					user: true,
					professionalExperiences: true
				}
			});
		if (professionalInformation) {
			throw new HttpException(
				'This user already has professional information.',
				HttpStatus.NOT_ACCEPTABLE
			);
		}

		const userAccount = await this.userAccountRepository.findOne({
			where: { userId: user.userId }
		});

		const professionalInfo = this.professionalInfoRepository.create({
			experienceInYears: data.experienceInYears,
			user: userAccount
		});

		if (data.specialities?.length) {
			professionalInfo.specialities = [];
			for (let i = 0; i < data.specialities.length; i += 1) {
				const speciality = await this.specialitiesRepository.findOne({
					where: {
						specialityId: data.specialities[i]
					}
				});
				if (speciality) {
					professionalInfo.specialities.push(speciality);
				}
			}
		}

		professionalInfo.professionalExperiences =
			await this.updateOrCreateProfessionalExperiences(
				data.professionalExperiences
			);
		return this.professionalInfoRepository.save(professionalInfo);
	}

	async getAllEntities() {
		return this.professionalInfoRepository.find({
			relations: { professionalExperiences: true, specialities: true }
		});
	}

	async updateEntity(
		body: UpdateProfessionalInfoDto,
		professionalInfoId: number
	): Promise<ProfessionalInfoEntity> {
		const professionalInfo = await this.professionalInfoRepository.findOne({
			where: { professionalInfoId: professionalInfoId },
			relations: { specialities: true, professionalExperiences: true }
		});

		if (body.specialities?.length) {
			professionalInfo.specialities = [];
			for (let i = 0; i < body.specialities.length; i += 1) {
				// eslint-disable-next-line no-await-in-loop
				const speciality = await this.specialitiesRepository.findOne({
					where: {
						specialityId: body.specialities[i]
					}
				});

				if (speciality) {
					professionalInfo.specialities.push(speciality);
				}
			}
		} else {
			professionalInfo.specialities = [];
		}

		professionalInfo.professionalExperiences =
			await this.updateOrCreateProfessionalExperiences(
				body.professionalExperiences
			);

		if (body.experienceInYears) {
			professionalInfo.experienceInYears = body.experienceInYears;
		}

		return this.professionalInfoRepository.save(professionalInfo);
	}

	async deleteEntity(professionalInfoId: number): Promise<DeleteResult> {
		return await this.professionalInfoRepository.delete(professionalInfoId);
	}

	async getOne(id: number): Promise<any> {
		const userAccount = await this.userAccountRepository.findOne({
			where: { userId: id },
			relations: { professionalInfo: true }
		});

		if (!userAccount.professionalInfo?.professionalInfoId) {
			throw new HttpException(
				'This user does not have professional information.',
				HttpStatus.NOT_FOUND
			);
		}

		return this.professionalInfoRepository.findOne({
			where: {
				professionalInfoId:
					userAccount.professionalInfo.professionalInfoId
			},
			relations: { professionalExperiences: true, specialities: true }
		});
	}
}
