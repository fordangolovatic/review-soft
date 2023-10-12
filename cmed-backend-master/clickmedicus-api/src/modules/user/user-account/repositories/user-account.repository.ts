import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { AccountType } from '@core/constants/enums/accountType.enum';
import { ConsultationStatusEnum } from '@core/constants/enums/consultationStatus.enum';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { QueryDoctorsDto } from '@modules/doctor/dto/doctors.query.dto';
import { QueryResidentsDto } from '@modules/resident/dto/residents.query.dto';
import { UserProfileDto } from '@modules/user-profile/dto/user-profile.dto';
import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, In, Repository } from 'typeorm';
import { ProfessionalInfoEntity } from '../entities/professional-info.entity';
import { UserAccountEntity } from '../entities/user-account.entity';
import {
	compareFavoriteArticles,
	compareRating
} from '../functions/sorting.function';
import { UserAccountRepositoryInterface } from '../interfaces/user-account.repository.interface';
import { UserAccountSort } from '../interfaces/user-account.sort.interface';

/**
 * A repository for user table.
 */
@Injectable()
export class UserAccountRepository
	extends BaseAbstractRepository<UserAccountEntity>
	implements UserAccountRepositoryInterface
{
	constructor(
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>,
		@InjectRepository(ProfessionalInfoEntity)
		private readonly professionalInfoRepository: Repository<ProfessionalInfoEntity>,
		@InjectRepository(ArticleEntity)
		private readonly accountArticles: Repository<ArticleEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRespository: Repository<UserAccountEntity>,
		@InjectDataSource() private readonly connection: DataSource
	) {
		super(userAccountRepository);
	}

	async getOne(id: number): Promise<UserAccountEntity> {
		const userAccount = await this.userAccountRepository.findOne({
			where: { userId: id },
			relations: {
				professionalInfo: true,
				medicalRecord: true,
				specialities: true
			}
		});
		return userAccount;
	}

	/**
	 * Get a list of user profiles.
	 */
	async getUserProfileList(
		// accountTypeId: number,
		userId: number
	): Promise<UserProfileDto[]> {
		const userProfiles = await this.connection.query(
			`
			SELECT A.user_id userId, A.first_name firstName, A.last_name lastName,
			A.account_type_id accountTypeId, T.account_type_name accountTypeName, gender,
			A.address, A.postal_code postalCode, A.email, A.parent_account_id parentAccountId,
			A.date_of_birth dateOfBirth, A.profile_image profileImage, 
			A.is_translator isTranslator, A.is_verified isVerified,
			A.terms_and_condition_accepted termsAndConditionAccepted, 
			C.country_id countryId, C.country_name countryName,
			S.state_id stateId, S.state_name stateName, A.city_id cityId, CI.city_name cityName
			FROM account A
			INNER JOIN account_type T ON A.account_type_id = T.account_type_id
			LEFT JOIN city CI ON A.city_id = CI.city_id
			LEFT JOIN state S ON CI.state_id = S.state_id
			LEFT JOIN country C ON (S.country_id = C.country_id OR CI.country_id = C.country_id)
			WHERE (A.account_type_id = ${userId} OR ${userId} = 0) 
			AND (A.user_id = ${userId} OR ${userId} = 0)
			`
		);

		return userProfiles as UserProfileDto[];
	}

	async getProfile(userId: number) {
		const accountData = await this.userAccountRespository.findOne({
			where: { userId },
			relations: {
				languages: true,
				city: true,
				country: true,
				state: true,
				activityProgram: { consultations: true },
				professionalInfo: { professionalExperiences: true }
			}
		});

		// const accountProfessionalInfo =
		// 	await this.professionalInfoRepository.findOne({
		// 		where: {
		// 			user: { userId: accountData.userId }
		// 		},
		// 		relations: {
		// 			user: true,
		// 			professionalExperiences: true
		// 		}
		// 	});

		const accountArticles = await this.accountArticles.find({
			where: {
				createdBy: {
					userId: accountData.userId
				}
			}
		});

		let ratingSum = 0;
		let ratedConsultations = 0;

		accountData.activityProgram.map(activity =>
			activity.consultations
				.filter(consultation => consultation.rating)
				.map(ratedConsultation => {
					ratingSum += parseFloat(
						ratedConsultation.rating.toString()
					);
					return (ratedConsultations += 1);
				})
		);

		accountData.rating = {
			rate: Number((ratingSum / ratedConsultations).toFixed(2)) || 0,
			consultations: ratedConsultations || 0
		};

		accountData.activityProgram.map(ap => {
			ap.slots = ap.slots.filter(
				activitySlot =>
					!ap.consultations.find(
						c =>
							c.startTime === activitySlot &&
							c.consultationStatus !==
								ConsultationStatusEnum.CANCELLED
					)
			);
		});

		const result = {
			...accountData,
			// professionalExperience:
			// 	accountProfessionalInfo?.professionalExperiences,
			articles: accountArticles,
			activityProgram: accountData.activityProgram,
			description: accountData.description,
			// dateOfBirth: accountData.dateOfBirth,
			city: accountData.city,
			country: accountData.country,
			state: accountData.state,
			// address: accountData.address,
			profileImage: accountData.profileImage,
			languages: accountData.languages
		};
		delete result.user;
		return result;
	}
	async getDoctorsInformation(queryParams: QueryDoctorsDto) {
		const EMPTY_FILTER = {};
		const languages = queryParams?.languages ?? [];
		const countries = queryParams?.countries ?? [];
		const specialityNames = queryParams.specialities ?? [];
		const sortOption = queryParams?.sort;

		const specialitiesFilter = !specialityNames?.length
			? { specialities: EMPTY_FILTER }
			: { specialities: { specialityName: In([...specialityNames]) } };

		const options: FindOneOptions<UserAccountEntity> = {
			where: {
				accountType: AccountType.DOCTOR,
				professionalInfo: {
					...specialitiesFilter
				}
			}
		};

		const doctors: UserAccountEntity[] =
			await this.userAccountRespository.find({
				where: options.where,
				relations: {
					activityProgram: { consultations: true },
					professionalInfo: {
						professionalExperiences: true,
						specialities: true
					},
					languages: true,
					country: true,
					article: { favoriteArticle: true }
				},
				select: {
					userId: true,
					firstName: true,
					lastName: true,
					accountType: true,
					profileImage: true,
					languages: true,
					dateOfBirth: true,
					address: true,
					country: {
						countryId: true,
						countryName: true,
						createdBy: true,
						createdDate: true,
						modifiedBy: true,
						modifiedDate: true
					},
					professionalInfo: {
						professionalInfoId: true,
						specialities: true
					},
					article: { articleId: true, favoriteArticle: true }
				}
			});

		doctors?.map(doctor => {
			let ratingSum = 0;
			let ratedConsultations = 0;

			doctor.activityProgram.map(
				activity =>
					activity?.consultations
						?.filter(consultation => consultation.rating)
						.map(ratedConsultation => {
							ratingSum += parseFloat(
								ratedConsultation.rating.toString()
							);
							return (ratedConsultations += 1);
						}) || []
			);

			doctor.rating = {
				rate: Number((ratingSum / ratedConsultations).toFixed(2)) || 0,
				consultations: ratedConsultations || 0
			};

			doctor.activityProgram.map(activity => {
				activity.slots =
					activity?.slots?.filter(
						activitySlot =>
							!activity?.consultations?.find(
								consultation =>
									consultation.startTime === activitySlot &&
									consultation.consultationStatus !==
										ConsultationStatusEnum.CANCELLED
							)
					) || [];
			});
		});

		switch (sortOption) {
			case UserAccountSort.FAVORITE: 
				doctors.sort(compareFavoriteArticles);
				break;

			case UserAccountSort.RATING:
				doctors.sort(compareRating);
				break;

			// NOTE: we also need to implement sorting based on experience and price
		}

		return doctors;
	}

	async getResidentsInformation(queryParams: QueryResidentsDto) {
		const languages = queryParams.languages ?? [];
		const countries = queryParams.countries ?? [];

		// const filter = this.formulateFilter(languages, countries);

		const residents: UserAccountEntity[] =
			await this.userAccountRespository.find({
				where: { accountType: AccountType.RESIDENT },
				relations: {
					activityProgram: true,
					professionalInfo: true,
					languages: true,
					country: true
				},

				select: {
					userId: true,
					firstName: true,
					lastName: true,
					accountType: true,
					profileImage: true,
					languages: true,
					country: {
						countryId: true,
						countryName: true,
						createdBy: true,
						createdDate: true,
						modifiedBy: true,
						modifiedDate: true
					}
				}
			});
		return residents;
	}
}
