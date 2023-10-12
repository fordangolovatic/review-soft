import { User } from '@core/decorators/user.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Inject
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notifications.dto';
import { NotificationResponse } from './dto/notification.response.dto';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { NotificationServiceInterface } from './interfaces/notification.service.interface';
import { BaseController } from '@base/controller/base.controller';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController extends BaseController {
	constructor(
		@Inject(DIToken.NOTIFICATIONS_SERVICE_INTERFACE)
		private readonly notificationService: NotificationServiceInterface
	) {
		super();
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200 },
		apiSecurityData: 'accessToken',
		apiBodyData: { type: CreateNotificationDto }
	})
	@Post()
	create(
		@Body() body: CreateNotificationDto,
		@User() user: UserAccountEntity
	) {
		return this.notificationService.create(body);
	}

	@SwaggerRouteDecorator({
		apiResponseData: {
			status: 200,
			type: NotificationResponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@Get()
	getAll(@User() user: UserAccountEntity) {
		return this.notificationService.getUnreadNotificationsForCurrentUser(
			user
		);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: NotificationResponse },
		apiSecurityData: 'accessToken'
	})
	@Post('/read/:id')
	readOne(@Param('id') id: number) {
		return this.notificationService.readNotification(+id);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: NotificationResponse },
		apiSecurityData: 'accessToken'
	})
	@Post('/read')
	readAll(@User() user: UserAccountEntity) {
		return this.notificationService.readAllNotifications(user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200, type: NotificationResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.notificationService.getById(+id);
	}
	@SwaggerRouteDecorator({
		apiResponseData: { status: 204 },
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.notificationService.deleteById(+id);
	}
}
