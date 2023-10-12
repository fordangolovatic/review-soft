import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CreateNotificationDto } from '../dto/create-notifications.dto';
import { NotificationEntity } from '../entities/notification.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A contract for [NotificationRepository]{@link NotificationsRepository} class.
 */
export interface NotificationsRepositoryInterface
	extends BaseRepositoryInterface<NotificationEntity> {
	getAll(): Promise<any>;

	// getUserNotifications(user: UserAccountEntity): Promise<any>;
	readAllUserNotifications(user: UserAccountEntity): Promise<any>;

	create(
		createNotificationDto: CreateNotificationDto
	): Promise<NotificationEntity>;

	getById(notificationId: number): Promise<NotificationEntity>;

	save(notificationEntity: NotificationEntity): Promise<any>;

	deleteById(notificationId: number): Promise<any>;

	getUnreadNotificationsForCurrentUser(
		user: UserAccountEntity
	): Promise<NotificationEntity[]>;
}
