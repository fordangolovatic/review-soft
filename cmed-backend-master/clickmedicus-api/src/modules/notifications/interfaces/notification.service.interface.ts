import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateNotificationDto } from '../dto/create-notifications.dto';
import { NotificationEntity } from '../entities/notification.entity';

/**
 * A service contract which must be implemented by [NotificationService]{@link NotificationService}.
 */
export interface NotificationServiceInterface {
	create(data: CreateNotificationDto): Promise<NotificationEntity>;
	getAll(): Promise<any>;
	readAllNotifications(user: UserAccountEntity): Promise<any>;
	readNotification(id: number): Promise<any>;

	getUnreadNotificationsForCurrentUser(
		user: UserAccountEntity
	): Promise<NotificationEntity[]>;
	getById(id: number);

	deleteById(id: number);
}
