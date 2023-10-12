import { IsIn, IsNotEmpty } from 'class-validator';
import { NotificationTypeEnum } from '../../../core/constants/enums/notifications.enum';

/**
 * A DTO class for Notification.
 */
export class CreateNotificationDto {
	@IsNotEmpty()
	user: number;

	@IsNotEmpty()
	redirectId: number;

	@IsNotEmpty()
	title: string;

	@IsIn(Object.values(NotificationTypeEnum))
	type: NotificationTypeEnum;

	@IsNotEmpty()
	isRead: boolean;

	@IsNotEmpty()
	createdBy: number;
}
