import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LanguageEntity } from '../../../shared/language/entities/language.entity';
import { UserAccountEntity } from '../../../user/user-account/entities/user-account.entity';
import { ForumCommentEntity } from '../../forum-comment/entities/forum-comment.entity';

/**
 * An entity class for forum table in the database.
 */
@Entity('forum')
export class ForumEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'forum_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	forumId: number;

	/**
	 * Question for the forum.
	 */
	@Column({
		name: 'forum_question',
		type: 'nvarchar',
		comment: 'Question for the forum.',
		unique: false,
		length: 500,
		nullable: false
	})
	forumQuestion: string;

	/**
	 * Description of the question.
	 */
	@Column({
		name: 'description',
		type: 'nvarchar',
		comment: 'Description of the question.',
		unique: false,
		length: 1000,
		nullable: true
	})
	description: string;

	/**
	 * The user who have asked the question.
	 */
	@Column({
		name: 'user_id',
		type: 'int',
		comment: 'The user who have asked the question.',
		unique: false,
		nullable: false
	})
	userId: number;

	/**
	 * FK to the language table.
	 */
	@Column({
		name: 'language_id',
		type: 'int',
		comment: 'FK to the language table.',
		unique: false,
		nullable: false
	})
	languageId: number;

	/**
	 * Date and time when the record is created.
	 */
	@Column({
		name: 'created_date',
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false
	})
	createdDate: string;

	/**
	 * FK to the speciality table.
	 */
	@Column({
		name: 'speciality_id',
		type: 'int',
		comment: 'FK to the speciality table.',
		unique: false,
		nullable: false
	})
	specialityId: number;

	/**
	 * No of likes on the forum.
	 */
	@Column({
		name: 'no_of_likes',
		type: 'int',
		comment: 'No of likes on the forum.',
		unique: false,
		nullable: true
	})
	noOfLikes: number;

	/**
	 * No of comments on the forum.
	 */
	@Column({
		name: 'no_of_comments',
		type: 'int',
		comment: 'No of comments on the forum.',
		unique: false,
		nullable: true
	})
	noOfComments: number;

	/**
	 * No of views on the forum.
	 */
	@Column({
		name: 'no_of_views',
		type: 'int',
		comment: 'No of views on the forum.',
		unique: false,
		nullable: true
	})
	noOfViews: number;

	/**
	 * Reference with primary key table - language to create Many-to-One relationship constraint FK_forum_language.
	 */
	@ManyToOne(() => LanguageEntity, language => language.forums)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_forum_language',
		name: 'language_id',
		referencedColumnName: 'languageId'
	})
	language: LanguageEntity;

	/**
	 * Reference with primary key table - speciality to create Many-to-One relationship constraint FK_forum_specialty.
	 */
	// @ManyToOne(() => SpecialityEntity, speciality => speciality.forums)
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_forum_speciality',
	// 	name: 'speciality_id',
	// 	referencedColumnName: 'specialityId'
	// })
	// speciality: SpecialityEntity;

	/**
	 * Reference with primary key table - user to create Many-to-One relationship constraint FK_forum_user.
	 */
	@ManyToOne(() => UserAccountEntity, user => user.forums)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_forum_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;

	/**
	 * Reference with foreign key table - forum_comment to create One-to-Many relationship constraint FK_forum_comment_forum.
	 */
	@OneToMany(() => ForumCommentEntity, forumComment => forumComment.forum)
	forumComments: ForumCommentEntity[];
}
