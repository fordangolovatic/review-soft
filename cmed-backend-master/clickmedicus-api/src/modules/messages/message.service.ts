import { DIToken } from '@core/constants/enums/ditoken.enum';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { MessageRepositoryInterface } from '@modules/messages/interface/message.repository.interface';
import { MessageServiceInterface } from '@modules/messages/interface/message.service.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

@Injectable()
export class MessageService implements MessageServiceInterface {
	constructor(
		@Inject(DIToken.MESSAGES_REPOSITORY_INTERFACE)
		private messageRepository: MessageRepositoryInterface
	) {}

	/**
	 * Send a message from ➝ to with content
	 * **/
	getLastMessage(userId: number): Promise<MessageEntity> {
		try {
			return this.messageRepository.getLastMessage(userId);
		} catch (error) {
			throw error;
		}
	}

	/** Get a summary of messages,
	 * should return only the LAST message for
	 * every different sender to the currently logged-in user. **/
	getMessagesBySenderId(
		senderId: number,
		userId: number
	): Promise<Array<MessageEntity>> {
		try {
			return this.messageRepository.getMessagesBySenderId(
				senderId,
				userId
			);
		} catch (error) {
			throw error;
		}
	}

	/** Get all messages from senderId
	 * to currently logged-in user**/
	async sendMessage(
		from: number,
		to: number,
		content: string,
		subject: string,
		user: UserAccountEntity,
		consultationId?: number
	): Promise<MessageEntity> {
		try {
			const msg = await this.messageRepository.sendMessage(
				from,
				to,
				content,
				subject,
				user,
				consultationId
			);
			return msg;
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Deletes a message by id, only if the author is the self logged user
	 */
	async deleteMessage(
		id: number,
		user: UserAccountEntity
	): Promise<DeleteResult> {
		try {
			return await this.messageRepository.deleteMessage(id, user);
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Reads the messages from a specific user in conversation
	 */
	async readMessages(
		from: number,
		user: UserAccountEntity
	): Promise<MessageEntity[]> {
		try {
			return await this.messageRepository.readMessages(from, user);
		} catch (error) {
			throw error;
		}
	}
}
