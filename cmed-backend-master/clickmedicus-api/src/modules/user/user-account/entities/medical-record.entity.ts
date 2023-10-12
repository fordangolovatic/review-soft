import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserAccountEntity } from '../entities/user-account.entity';

export enum DrinkingStatus {
	OCCASIONALLY = 'occasionally',
	DAILY = 'daily',
	NEVER = 'never'
}
/**
 * An entity class for medical-record table in the database.
 */
@Entity('medical_record')
export class MedicalRecordEntity {
	@Column({
		name: 'medical_record_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	medicalRecordId: number;

	@Column('varchar', { nullable: true })
	gender: string;

	@Column({
		name: 'height',
		type: 'bigint',
		nullable: false
	})
	height: number;

	@Column({
		name: 'weight',
		type: 'bigint',
		nullable: false
	})
	weight: number;

	@Column('simple-array', { nullable: true })
	operations: string[];

	@Column('simple-array', { nullable: true })
	breaks: string[];

	@Column('simple-array', { nullable: true })
	allergies: string[];

	@Column('simple-array', { nullable: true })
	diseases: string[];

	@Column('simple-array', { nullable: true })
	medicaments: string[];

	@Column({
		name: 'isSmoking',
		type: 'boolean',
		nullable: true,
		default: false
	})
	isSmoking: boolean;

	@Column({
		name: 'packsPerDay',
		type: 'bigint',
		nullable: false
	})
	packsPerDay: number;

	@Column({
		name: 'yearsOfSmoking',
		type: 'bigint',
		nullable: false
	})
	yearsOfSmoking: number;

	@Column({
		name: 'isDrinking',
		type: 'boolean',
		nullable: false,
		default: false
	})
	isDrinking: boolean;

	@Column({
		type: 'enum',
		enum: DrinkingStatus,
		default: DrinkingStatus.NEVER
	})
	drinkingStatus: DrinkingStatus;

	/**
	 * Reference with foreign key table - user to create One-to-One relationship constraint FK_user_account.
	 */
	@OneToOne(() => UserAccountEntity, user => user.medicalRecord)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_medical_record_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;
}
