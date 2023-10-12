import { DIToken } from '@core/enums/ditoken.enum';
import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { MessageController } from '@modules/messages/message.controller';
import { MessageService } from '@modules/messages/message.service';
import { MessageRepository } from '@modules/messages/repositories/message.repository';
import { NotificationEntity } from '@modules/notifications/entities/notification.entity';
import { NotificationRepository } from '@modules/notifications/repositories/notifiction.repository';
import { ProfessionalExperienceEntity } from '@modules/user/user-account/entities/professional-experience.entity';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			MessageEntity,
			ProfessionalInfoEntity,
			ProfessionalExperienceEntity,
			UserAccountEntity,
			NotificationEntity,
			ArticleEntity,
			ConsultationSessionEntity
		])
	],
	controllers: [MessageController],
	providers: [
		{
			provide: DIToken.MESSAGES_REPOSITORY_INTERFACE,
			useClass: MessageRepository
		},
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		{
			provide: DIToken.NOTIFICATIONS_SERVICE_INTERFACE,
			useClass: NotificationRepository
		},
		{
			provide: DIToken.MESSAGES_SERVICE_INTERFACE,
			useClass: MessageService
		}
	],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.MESSAGES_REPOSITORY_INTERFACE,
			useClass: MessageRepository
		},
		{
			provide: DIToken.MESSAGES_SERVICE_INTERFACE,
			useClass: MessageService
		}
	]
})
export class MessageModule {}
