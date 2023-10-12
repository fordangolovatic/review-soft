import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

import { NotificationTypeEnum } from '@core/constants/enums/notifications.enum';

@Entity('notification')
export class NotificationEntity {
	@Column({
		name: 'notification_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	notificationId: number;

	@ManyToOne(() => UserAccountEntity, user => user.userId)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_notification_user',
		name: 'user',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;

	@Column({
		name: 'redirect_id',
		type: 'nvarchar',
		comment: 'redirectId of the notification.',
		unique: false,
		nullable: false
	})
	redirectId: number;

	@Column({
		name: 'title',
		type: 'nvarchar',
		comment: 'Title of the notification.',
		unique: false,
		nullable: false
	})
	title: string;

	@Column({
		type: 'enum',
		enum: NotificationTypeEnum,
		comment: 'Message received.',
		default: NotificationTypeEnum.MESSAGE_RECEIVED
	})
	type: NotificationTypeEnum;
	@Column({
		name: 'is_read',
		type: 'boolean',
		comment: 'Notification is read.',
		default: false
	})
	isRead: boolean;

	@ManyToOne(() => UserAccountEntity, user => user.notification)
	@JoinColumn({
		name: 'created_by',
		foreignKeyConstraintName: 'FK_notification_created_by',
		referencedColumnName: 'userId'
	})
	createdBy: UserAccountEntity;

	@Column({
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false,
		default: () => 'NOW()'
	})
	createdAt: string;
}
