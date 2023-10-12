import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { CreateNotificationDto } from './dto/create-notifications.dto';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationsRepositoryInterface } from './interfaces/notification.repository.interface';
import { NotificationServiceInterface } from './interfaces/notification.service.interface';

@Injectable()
export class NotificationService implements NotificationServiceInterface {
	constructor(
		@Inject(DIToken.NOTIFICATIONS_REPOSITORY_INTERFACE)
		private readonly notificationRepository: NotificationsRepositoryInterface
	) {}

	/**
	 * Create new notification.
	 * @param {CreateNotificationDto} createNotificationDto - Data transfer object for creating notification.
	 * @param {UserAccountEntity} user - User account entity.
	 */
	create(data: CreateNotificationDto): Promise<NotificationEntity> {
		return this.notificationRepository.create(data);
	}

	/**
	 * Get all Notifications.
	 */
	async getAll() {
		return this.notificationRepository.getAll();
	}

	getUnreadNotificationsForCurrentUser(user: UserAccountEntity) {
		return this.notificationRepository.getUnreadNotificationsForCurrentUser(
			user
		);
	}

	/**
	 * Reading all user notifications
	 * @param {user} user - User authenticated
	 */
	async readAllNotifications(user: UserAccountEntity) {
		return this.notificationRepository.readAllUserNotifications(user);
	}

	/**
	 * Get Notification by id.
	 * @param {notificationId} notificationId - Notification id.
	 */
	async readNotification(notificationId: number) {
		const notification = await this.getById(notificationId);

		if (!notification) {
			throw new NotFoundException();
		}

		notification.isRead = true;
		return this.notificationRepository.save(notification);
	}

	/**
	 * Get Notification by id.
	 * @param {notificationId} notificationId - Notification id.
	 */
	async getById(notificationId: number) {
		return this.notificationRepository.getById(notificationId);
	}

	/**
	 * Delete Notification by id.
	 * @param {notificationId} notificationId - Notification id.
	 */
	async deleteById(notificationId: number) {
		return this.notificationRepository.deleteById(notificationId);
	}
}
