import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserAccountEntity } from './user-account.entity';
import { ProfessionalExperienceEntity } from '@modules/user/user-account/entities/professional-experience.entity';

/**
 * An entity class for account table in the database.
 */
@Entity('professional-info')
export class ProfessionalInfoEntity {
	@Column({
		name: 'professional_info_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	professionalInfoId: number;

	@Column({
		name: 'experienceInYears',
		type: 'bigint',
		nullable: false
	})
	experienceInYears: number;

	/**
	 * Reference with foreign key table - user to create One-to-One relationship constraint FK_user_account.
	 */
	@OneToOne(() => UserAccountEntity, user => user.professionalInfo)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_professional_info_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;

	@OneToMany(
		() => ProfessionalExperienceEntity,
		professionalExperiences => professionalExperiences.professionalInfo
	)
	professionalExperiences: ProfessionalExperienceEntity[];

	@OneToMany(
		() => SpecialityEntity,
		speciality => speciality.professionalInfo
	)
	specialities: SpecialityEntity[];
}
