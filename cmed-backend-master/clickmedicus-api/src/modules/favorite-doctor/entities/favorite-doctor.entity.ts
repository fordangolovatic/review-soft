import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('favorite_doctor')
export class FavoriteDoctorEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'favorite_doctor_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	favoriteDoctorId: number;

	/**
	 * User id of a user who created the record.
	 */

	@ManyToOne(() => UserAccountEntity, user => user.doctor)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_favorite_doctor_created_by',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	createdBy: UserAccountEntity;

	/**
	 * User id of favorite doctor.
	 */

	@ManyToOne(() => UserAccountEntity, doctor => doctor.userId)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_favorite_doctor_user',
		name: 'user',
		referencedColumnName: 'userId'
	})
	doctor: UserAccountEntity;

	/**
	 * Date and time when the record is created.
	 */
	@Column({
		name: 'created_date',
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false,
		default: () => 'NOW()'
	})
	createdDate: Date;
}
