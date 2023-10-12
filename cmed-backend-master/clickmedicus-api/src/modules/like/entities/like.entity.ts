import { PostEntity } from '@modules/social-media/media/entities/post.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Column, Entity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('like')
export class LikeEntity {
	@Column({
		name: 'like_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	likeId: number;

	@ManyToOne(() => UserAccountEntity, user => user.like)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_like_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	userId: UserAccountEntity;

	@ManyToOne(() => PostEntity, post => post.like)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_like_post',
		name: 'post_id',
		referencedColumnName: 'postId'
	})
	postId: PostEntity;

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
	createdAt: Date;
}
