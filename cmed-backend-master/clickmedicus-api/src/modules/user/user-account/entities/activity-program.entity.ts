import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserAccountEntity } from '../../../user/user-account/entities/user-account.entity';

@Entity('activity_program')
export class ActivityProgramEntity {
	@Column({
		name: 'id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	id: number;

	@OneToMany(
		() => ConsultationSessionEntity,
		consultation => consultation.activity
	)
	consultations: ConsultationSessionEntity[];

	@Column({
		name: 'date',
		type: 'varchar',
		comment: 'Date of the activity',
		unique: false,
		length: 5000,
		nullable: false
	})
	date: string;

	@Column({
		name: 'price',
		type: 'bigint',
		comment: 'price of activity',
		unique: false,
		nullable: false
	})
	price: bigint;

	@Column('json', { name: 'slots', comment: 'listed slots' })
	slots: string[];

	@ManyToOne(
		() => UserAccountEntity,
		userAccount => userAccount.activityProgram
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_activity_program_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	account: UserAccountEntity;
}
