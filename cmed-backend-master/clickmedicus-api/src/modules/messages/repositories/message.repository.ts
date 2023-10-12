import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { NotificationTypeEnum } from '@core/constants/enums/notifications.enum';
import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { MessageRepositoryInterface } from '@modules/messages/interface/message.repository.interface';
import { NotificationServiceInterface } from '@modules/notifications/interfaces/notification.service.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * A repository for Message table.
 */
@Injectable()
export class MessageRepository
	extends BaseAbstractRepository<MessageEntity>
	implements MessageRepositoryInterface
{
	constructor(
		@InjectRepository(MessageEntity)
		private readonly messageRepository: Repository<MessageEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>,
		@Inject(DIToken.NOTIFICATIONS_SERVICE_INTERFACE)
		private readonly notificationService: NotificationServiceInterface,
		@InjectRepository(ConsultationSessionEntity)
		private readonly consultationSessionRepository: Repository<ConsultationSessionEntity>
	) {
		super(messageRepository);
	}

	async getLastMessage(userId: number): Promise<MessageEntity> {
		return this.messageRepository
			.query(`SELECT m.*, uf.firstname AS from_firstName, uf.lastname AS from_lastName, uf.profileimage as from_profileImage, ut.firstname AS to_firstName, ut.lastname AS to_lastName, ut.profileimage as to_profileImage
		FROM message m
		JOIN user uf ON m.\`from\` = uf.user_id
		JOIN user ut ON m.\`to\` = ut.user_id
		WHERE m.message_id IN (
			SELECT MAX(message_id)
			FROM message
			WHERE \`from\` = ${userId} OR \`to\` = ${userId}
			GROUP BY LEAST(\`from\`, \`to\`), GREATEST(\`from\`, \`to\`)
		)`);
	}

	getMessagesBySenderId(
		senderId: number,
		userId: number
	): Promise<MessageEntity[]> {
		return this.messageRepository.find({
			where: [
				{ from: { userId: userId }, to: { userId: senderId } },
				{ from: { userId: senderId }, to: { userId: userId } }
			],
			relations: { from: true, to: true, consultation: true }
		});
	}

	async sendMessage(
		from: number,
		to: number,
		content: string,
		subject: string,
		user: UserAccountEntity,
		consultationId?: number
	) {
		const userAccountTo = await this.userAccountRepository.findOne({
			where: { userId: to }
		});
		const userAccountFrom = await this.userAccountRepository.findOne({
			where: { userId: user.userId }
		});

		const consultationSession = consultationId
			? await this.consultationSessionRepository.findOne({
					where: { consultationSessionId: consultationId }
			  })
			: null;

		if (!!userAccountTo) {
			const message = this.messageRepository.create();
			message.from = user;
			message.to = userAccountTo;
			message.content = content;
			message.subject = subject;
			message.consultation = consultationSession;
			const msg = await this.messageRepository.save(message);

			await this.notificationService.create({
				user: msg.to.userId,
				type: NotificationTypeEnum.MESSAGE_RECEIVED,
				redirectId: user.userId,
				title: `You have received a new message from ${userAccountFrom.firstName}  ${userAccountFrom.lastName}.`,
				isRead: false,
				createdBy: user.userId
			});

			return msg;
		}

		throw Error(
			'Something was wrong while sending the message. Please check the sender id and try again!'
		);
	}

	async deleteMessage(id, user: UserAccountEntity) {
		return await this.messageRepository.delete({
			messageId: id,
			from: { userId: user.userId }
		});
	}

	async readMessages(from, user: UserAccountEntity) {
		const foundMessages = await this.messageRepository.find({
			where: {
				from: { userId: from },
				to: { userId: user.userId },
				isRead: false
			}
		});

		foundMessages.map(message => (message.isRead = true));

		return await this.messageRepository.save(foundMessages);
	}

	async save(MessageEntity: MessageEntity) {
		return this.messageRepository.save(MessageEntity);
	}
}
