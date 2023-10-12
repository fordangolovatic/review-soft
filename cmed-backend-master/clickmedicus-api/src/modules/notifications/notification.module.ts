import { Module } from '@nestjs/common';
import { NotificationsController } from './notification.controller';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './repositories/notifiction.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationEntity } from '@modules/notifications/entities/notification.entity';


@Module({
	imports: [TypeOrmModule.forFeature([NotificationEntity])],
	controllers: [NotificationsController],
	providers: [
		{
			provide: DIToken.NOTIFICATIONS_REPOSITORY_INTERFACE,
			useClass: NotificationRepository
		},
		{
			provide: DIToken.NOTIFICATIONS_SERVICE_INTERFACE,
			useClass: NotificationService
		}
	]
})
export class NotificationsModule {}
