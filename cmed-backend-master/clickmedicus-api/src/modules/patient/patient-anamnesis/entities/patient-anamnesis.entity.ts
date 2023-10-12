import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { PatientAnamnesisHistoryEntity } from '../../patient-anamnesis-history/entities/patient-anamnesis-history.entity';

/**
 * An entity class for patient_anamnesis table in the database.
 */
@Entity('patient_anamnesis')
export class PatientAnamnesisEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'patient_anamnesis_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	patientAnamnesisId: number;

	/**
	 * FK to account table.
	 */
	@Column({
		name: 'patient_id',
		type: 'bigint',
		comment: 'FK to account table.',
		unique: false,
		nullable: false
	})
	patientId: number;

	/**
	 * Allow doctors to view history.
	 */
	@Column({
		name: 'is_public',
		type: 'boolean',
		comment: 'Allow doctors to view history.',
		unique: false,
		nullable: true
	})
	isPublic: boolean;

	/**
	 * Reference with primary key table - account to create One-to-One relationship constraint FK_patient_anamnesis_account.
	 */
	@OneToOne(() => UserAccountEntity, account => account.patientAnamnesis)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_patient_anamnesis_account',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	account: UserAccountEntity;

	/**
	 * Reference with foreign key table - patient_anamnesis_history to create One-to-Many relationship constraint FK_patient_anamnesis_history_patient_anamnesis.
	 */
	@OneToMany(
		() => PatientAnamnesisHistoryEntity,
		patientAnamnesisHistory => patientAnamnesisHistory.patientAnamnesis
	)
	patientAnamnesisHistorys: PatientAnamnesisHistoryEntity[];
}
