import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserAccountEntity } from '../../../user/user-account/entities/user-account.entity';
import { ForumEntity } from '../../forum/entities/forum.entity';

/**
 * An entity class for forum_comment table in the database.
 */
@Entity('forum_comment')
export class ForumCommentEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'forum_comment_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	forumCommentId: number;

	/**
	 * FK to forum table.
	 */
	@Column({
		name: 'forum_id',
		type: 'bigint',
		comment: 'FK to forum table.',
		unique: false,
		nullable: false
	})
	forumId: number;

	/**
	 * FK to user table. A user who commented on the forum.
	 */
	@Column({
		name: 'commenter_id',
		type: 'int',
		comment: 'FK to user table. A user who commented on the forum.',
		unique: false,
		nullable: false
	})
	commenterId: number;

	/**
	 * Timestamp of comment.
	 */
	@Column({
		name: 'comment_datetime',
		type: 'datetime',
		comment: 'Timestamp of comment.',
		unique: false,
		nullable: false
	})
	commentDatetime: string;

	/**
	 * Comment.
	 */
	@Column({
		name: 'comment',
		type: 'nvarchar',
		comment: 'Comment.',
		unique: false,
		length: 5000,
		nullable: false
	})
	comment: string;

	/**
	 * Self refrenece to article_comment_id in case of reply to the comment.
	 */
	@Column({
		name: 'ref_comment_id',
		type: 'bigint',
		comment:
			'Self refrenece to article_comment_id in case of reply to the comment.',
		unique: false,
		nullable: true
	})
	refCommentId: number;

	/**
	 * Comment is blocked or not.
	 */
	@Column({
		name: 'is_blocked',
		type: 'boolean',
		comment: 'Comment is blocked or not.',
		unique: false,
		nullable: true
	})
	isBlocked: boolean;

	/**
	 * Reason of blocking the commnet.
	 */
	@Column({
		name: 'reason_for_block',
		type: 'nvarchar',
		comment: 'Reason of blocking the commnet.',
		unique: false,
		length: 500,
		nullable: true
	})
	reasonForBlock: string;

	/**
	 * Reference with primary key table - forum to create Many-to-One relationship constraint FK_forum_comment_forum.
	 */
	@ManyToOne(() => ForumEntity, forum => forum.forumComments)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_forum_comment_forum',
		name: 'forum_id',
		referencedColumnName: 'forumId'
	})
	forum: ForumEntity;

	/**
	 * Reference with primary key table - user to create Many-to-One relationship constraint FK_forum_comment_user.
	 */
	@ManyToOne(() => UserAccountEntity, user => user.forumComments)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_forum_comment_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;
}
