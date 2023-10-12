import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An entity class for account_availability table in the database.
 */
@Entity('account_availability')
export class AccountAvailabilityEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'account_availability_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	accountAvailabilityId: number;

	/**
	 * FK to account table.
	 */
	@Column({
		name: 'user_id',
		type: 'bigint',
		comment: 'FK to account table.',
		unique: false,
		nullable: false
	})
	userId: number;

	/**
	 * Date and time from when Doctors are available.
	 */
	@Column({
		name: 'available_from',
		type: 'datetime',
		comment: 'Date and time from when Doctors are available.',
		unique: false,
		nullable: false
	})
	availableFrom: string;

	/**
	 * Date and time untill when Doctors are available.
	 */
	@Column({
		name: 'available_to',
		type: 'datetime',
		comment: 'Date and time untill when Doctors are available.',
		unique: false,
		nullable: false
	})
	availableTo: string;

	/**
	 * Reference with primary key table - account to create Many-to-One relationship constraint FK_account_availability_account.
	 */
	@ManyToOne(() => UserAccountEntity, account => account.accountAvailability)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_availability_account',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	account: UserAccountEntity;
}
