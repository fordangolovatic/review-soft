import { MessageEntity } from '@modules/messages/entities/message.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { DeleteResult } from 'typeorm';

/**
 * A service contract which must be implemented by [LanguageService]{@link LanguageService}.
 */
export interface MessageServiceInterface {
	/**
	 * Returns a list of all the records of language.
	 */
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
	 * Deletes a message by id if the author is self user
	 */
	deleteMessage(id: number, user: UserAccountEntity): Promise<DeleteResult>;

	/**
	 * Reads the messages from a specific user in conversation
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
