import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ArticleEntity } from '@modules/articles/entities/article.entity';

@Entity('favorite_article')
export class FavoriteArticleEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'favorite_article_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	favoriteArticleId: number;

	/**
	 * User id of a user who created the record.
	 */

	@ManyToOne(() => UserAccountEntity, user => user.favoriteArticle)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_favorite_article_created_by',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	createdBy: UserAccountEntity;

	/**
	 * User id of favorite article.
	 */

	@ManyToOne(() => ArticleEntity, article => article.articleId, { onDelete: 'CASCADE' })
	@JoinColumn({
		foreignKeyConstraintName: 'FK_favorite_article',
		name: 'article',
		referencedColumnName: 'articleId',
		
	})
	article: ArticleEntity;

	/**
	 * Date and time when the record is created.
	 */
	@Column({
		name: 'created_date',
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false,
		default: () => 'NOW()'
	})
	createdDate: Date;
}
