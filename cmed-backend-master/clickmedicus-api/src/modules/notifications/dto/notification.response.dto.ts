import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

import { NotificationTypeEnum } from '../../../core/constants/enums/notifications.enum';
export class NotificationResponse {
	@IsNotEmpty()
	user: string;

	@IsNotEmpty()
	redirectId: string; //we'll redirect the user, when he clicks on notification

	@IsNotEmpty()
	title: string;

	@IsIn(Object.values(NotificationTypeEnum))
	type: NotificationTypeEnum;

	@IsNotEmpty()
	createdArt: string;

	@IsNotEmpty()
	isRead: boolean;

	@IsNotEmpty()
	createdBy: string;
}
