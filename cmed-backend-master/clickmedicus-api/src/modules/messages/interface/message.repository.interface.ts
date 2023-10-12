import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { DeleteResult } from 'typeorm';

export interface MessageRepositoryInterface
	extends BaseRepositoryInterface<MessageEntity> {
	/**
	 * Send a message from ➝ to with content and subject.
	 * **/
	sendMessage(
		from: number,
		to: number,
		content: string,
		subject: string,
		user: UserAccountEntity,
		consultationId?: number
	): Promise<MessageEntity>;

	/**
	 * Message author can delete it's own messages
	 */
	deleteMessage(id: number, user: UserAccountEntity): Promise<DeleteResult>;

	/**
	 * Reads the unread messages with a specific user
	 */
	readMessages(
		from: number,
		user: UserAccountEntity
	): Promise<MessageEntity[]>;

	/** Get a summary of messages,
	 * should return only the LAST message for
	 * every different sender to the currently logged-in user. **/

	getLastMessage(userId: number): Promise<MessageEntity>;

	/** Get all messages from senderId
	 * to currently logged-in user**/

	getMessagesBySenderId(
		senderId: number,
		userId: number
	): Promise<Array<MessageEntity>>;
}
