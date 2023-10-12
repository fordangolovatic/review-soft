import { CommentEntity } from '@modules/comment/entities/comment.entity';
import { LikeEntity } from '@modules/like/entities/like.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne
} from 'typeorm';
import { ArticleEntity } from '@modules/articles/entities/article.entity';

@Entity('post')
export class PostEntity {
	@Column({
		name: 'post_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	postId: number;

	@Column({
		name: 'content',
		type: 'nvarchar',
		comment: 'Content of the media-post.',
		unique: false,
		length: 1000,
		nullable: true
	})
	content: string;

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
	created_date: Date;

	@ManyToOne(() => UserAccountEntity, user => user.post)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_post_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	user: UserAccountEntity;

	@Column({
		name: 'image',
		type: 'nvarchar',
		comment: 'Image of the media-post.',
		unique: false,
		nullable: true
	})
	image: string;

	@Column({
		name: 'video',
		type: 'nvarchar',
		comment: 'Video of the media-post.',
		unique: false,
		nullable: true
	})
	video: string;

	@OneToMany(() => LikeEntity, like => like.postId)
	like: LikeEntity[];

	@OneToOne(() => ArticleEntity, article => article.post)
	@JoinColumn()
	article: ArticleEntity;

	@OneToMany(() => CommentEntity, comment => comment.postId)
	comments: CommentEntity[];
}
