import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationsRepositoryInterface } from '../interfaces/notification.repository.interface';
import { CreateNotificationDto } from '../dto/create-notifications.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A repository for Notification table.
 */
@Injectable()
export class NotificationRepository
	extends BaseAbstractRepository<NotificationEntity>
	implements NotificationsRepositoryInterface
{
	constructor(
		@InjectRepository(NotificationEntity)
		private notificationRepository: Repository<NotificationEntity>
	) {
		super(notificationRepository);
	}

	async getAll(): Promise<any> {
		return await this.notificationRepository.find({});
	}

	// async getUserNotifications(user: UserAccountEntity): Promise<any> {
	// 	return await this.notificationRepository.find({
	// 		where: { createdBy: { userId: user.userId } }
	// 	});
	// }

	async getUnreadNotificationsForCurrentUser(
		user: UserAccountEntity
	): Promise<NotificationEntity[]> {
		return await this.notificationRepository.find({
			where: [{ user: { userId: user.userId }, isRead: false }],
			relations: { user: true }
		});
	}

	async readAllUserNotifications(user: UserAccountEntity): Promise<any> {
		const notifications = await this.notificationRepository.find({
			where: [{ user: { userId: user.userId }, isRead: false }]
		});

		notifications.map(notification => (notification.isRead = true));

		return await this.saveBulk(notifications);
	}

	async createEntity(
		createNotificationDto: CreateNotificationDto
	): Promise<NotificationEntity> {
		const notification = this.notificationRepository.create();
		notification.type = createNotificationDto.type;
		return this.notificationRepository.save(notification);
	}

	async save(notificationEntity: NotificationEntity) {
		return this.notificationRepository.save(notificationEntity);
	}

	async getById(notificationId: number): Promise<NotificationEntity> {
		return this.notificationRepository.findOne({
			where: { notificationId }
		});
	}

	async deleteById(notificationId: number): Promise<DeleteResult> {
		return this.notificationRepository.delete({
			notificationId
		});
	}
}
