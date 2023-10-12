import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { ProfessionalInfoEntity } from '../../../user/user-account/entities/professional-info.entity';

/**
 * An entity class for account table in the database.
 */
@Entity('professional-experience')
export class ProfessionalExperienceEntity {
	@Column({
		name: 'professional_experience_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	professionalExperienceId: number;

	@Column({
		name: 'speciality',
		type: 'nvarchar',
		nullable: true
	})
	speciality: string;

	@Column({
		name: 'position',
		type: 'nvarchar',
		nullable: false
	})
	position: string;

	@Column({
		name: 'location',
		type: 'nvarchar',
		nullable: false
	})
	location: string;

	@Column({
		type: 'varchar',
		comment: 'Date and time when the record is created.'
		// unique: false,
		// nullable: false,
		// default: () => 'NOW()'
	})
	startDate: string;

	@Column({
		type: 'varchar',
		comment: 'Date and time when the record is created.'
		// unique: false,
		// nullable: true,
		// default: () => 'NOW()'
	})
	endDate: string;

	@Column({
		name: 'isOngoing',
		type: 'boolean',
		nullable: false
	})
	isOngoing: boolean;

	/**
	 * Reference with primary key table - state to create Many-to-One relationship constraint FK_city_state.
	 */
	@ManyToOne(
		() => ProfessionalInfoEntity,
		professionalInfo => professionalInfo.professionalExperiences
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_professional-info_professionalExperience',
		name: 'professional_info_id',
		referencedColumnName: 'professionalInfoId'
	})
	professionalInfo: ProfessionalInfoEntity;
}
