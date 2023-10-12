import { PostEntity } from '@modules/social-media/media/entities/post.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('comment')
export class CommentEntity {
	@Column({
		name: 'comment_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	commentId: number;

	@Column({
		name: 'message',
		type: 'nvarchar',
		comment: 'message replay to a post ',
		unique: false,
		length: 1000,
		nullable: true
	})
	message: string;

	/**
	 * Date and time when the record is created.
	 */
	@Column({
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false,
		default: () => 'NOW()'
	})
	createdDate: Date;

	@ManyToOne(() => UserAccountEntity, user => user.comments)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_comment_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;

	@ManyToOne(() => PostEntity, post => post.comments)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_comment_post',
		name: 'post_id',
		referencedColumnName: 'postId'
	})
	postId: PostEntity;
}
