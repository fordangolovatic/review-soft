import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import moment from 'moment-timezone';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('message')
export class MessageEntity {
	@Column({
		name: 'message_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	messageId?: number;

	@ManyToOne(() => UserAccountEntity, user => user.userId)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_message_from_user',
		name: 'from'
	})
	from: UserAccountEntity;

	@ManyToOne(() => UserAccountEntity, user => user.userId)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_message_to_user',
		name: 'to'
	})
	to: UserAccountEntity;
	@Column({
		name: 'content',
		type: 'varchar',
		comment: 'Content of the message.',
		unique: false,
		length: 1000,
		nullable: true
	})
	content: string;

	@Column({
		name: 'subject',
		type: 'varchar',
		comment: 'Subject of the message.',
		length: 1000,
		nullable: true
	})
	subject: string;

	@Column({
		name: 'is_read',
		type: 'boolean',
		comment: 'Is message have read?',
		unique: false,
		nullable: true,
		default: false
	})
	isRead?: boolean;

	/**
	 * Date and time when the message is created.
	 */
	@Column({
		type: 'timestamp',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false
	})
	createdAt?: string;
	@BeforeInsert()
	updateCreatedAt() {
		this.createdAt = moment().utc().format();
	}

	/**
	 * Relation if the chat is made from a consultation
	 */
	@ManyToOne(
		() => ConsultationSessionEntity,
		consultationSession => consultationSession.consultationSessionId
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_consultation_session_id',
		name: 'consultation',
		referencedColumnName: 'consultationSessionId'
	})
	consultation?: ConsultationSessionEntity;
}
