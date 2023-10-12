import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateFavoriteDoctorDto } from '../dto/create-favorite-doctor.dto';
import { FavoriteDoctorEntity } from '../entities/favorite-doctor.entity';
import { FavoriteDoctorsRepositoryInterface } from '../interfaces/favorite-doctors.repository.interface';

/**
 * A repository for favorite doctor table
 */
@Injectable()
export class FavoriteDoctorsRepository
	extends BaseAbstractRepository<FavoriteDoctorEntity>
	implements FavoriteDoctorsRepositoryInterface
{
	constructor(
		@InjectRepository(FavoriteDoctorEntity)
		private readonly favoriteDoctorRepository: Repository<FavoriteDoctorEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>
	) {
		super(favoriteDoctorRepository);
	}

	async getAllFavoriteDoctors(user: UserAccountEntity): Promise<any> {
		const favoriteDoctorData = await this.favoriteDoctorRepository.find({
			where: [{ createdBy: { userId: user.userId } }],
			relations: {
				createdBy: {
					professionalInfo: true
				},
				doctor: {
					languages: true,
					activityProgram: true,
					specialities: true,
					professionalInfo: {
						specialities: true
					}
				}
			},
			select: {
				createdBy: {
					userId: true
				},
				doctor: {
					userId: true,
					firstName: true,
					lastName: true,
					profileImage: true,
					accountType: true,
					activityProgram: true
				}
			}
		});

		return favoriteDoctorData.map(favoriteDoctor => ({
			createdBy: favoriteDoctor.createdBy,
			createdDate: favoriteDoctor.createdDate,
			doctor: {
				userId: favoriteDoctor.doctor.userId,
				firstName: favoriteDoctor.doctor.firstName,
				lastName: favoriteDoctor.doctor.lastName,
				profileImage: favoriteDoctor.doctor.profileImage,
				languages: favoriteDoctor.doctor.languages,
				accountType: favoriteDoctor.doctor.accountType,
				user: favoriteDoctor.doctor.user,
				activityProgram: favoriteDoctor.doctor.activityProgram,
				specialties:
					favoriteDoctor.doctor?.professionalInfo?.specialities ?? [],
				yearsExperience:
					favoriteDoctor.doctor?.professionalInfo
						?.experienceInYears ?? null
			},
			favoriteDoctorId: favoriteDoctor.favoriteDoctorId
		}));
	}

	async createEntity(
		createFavoriteDoctorDto: CreateFavoriteDoctorDto
	): Promise<FavoriteDoctorEntity> {
		const favoriteDoctor = this.favoriteDoctorRepository.create();
		favoriteDoctor.createdBy = createFavoriteDoctorDto.createdBy;
		const doctor = await this.userAccountRepository.findOne({
			relations: {
				user: true
			},
			where: { userId: createFavoriteDoctorDto.doctorId }
		});
		if (!doctor) {
			throw Error('Please select valid docotor');
		}
		favoriteDoctor.doctor = doctor;
		return this.favoriteDoctorRepository.save(favoriteDoctor);
	}
}
