import { FavoriteArticleEntity } from '@modules/favorite-article/entities/favorite-article.entity';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';
import { PostEntity } from '@modules/social-media/media/entities/post.entity';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne
} from 'typeorm';

export enum ArticleTypeEnum {
	GENERAL = 'general',
	MEDICAL = 'medical',
	NEWS = 'news'
}

@Entity('article')
export class ArticleEntity {
	@Column({
		name: 'article_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	articleId: number;

	@Column({
		name: 'title',
		type: 'nvarchar',
		comment: 'Title of the article.',
		unique: false,
		length: 1000,
		nullable: false
	})
	title: string;

	@Column({
		name: 'content',
		type: 'nvarchar',
		comment: 'Content of the article.',
		unique: false,
		length: 1000,
		nullable: true
	})
	content: string;

	@Column({
		type: 'enum',
		enum: ArticleTypeEnum,
		comment: 'Type of the article.',
		default: ArticleTypeEnum.GENERAL
	})
	type: ArticleTypeEnum;

	@Column({
		name: 'articleImage',
		type: 'varchar',
		length: 500,
		comment: 'Article image path.',
		nullable: true
	})
	image: string;

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

	@ManyToOne(() => UserAccountEntity, user => user.article)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_article_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	createdBy: UserAccountEntity;

	@ManyToOne(() => SpecialityEntity, speciality => speciality.specialityId)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_article_speciality',
		name: 'speciality_id',
		referencedColumnName: 'specialityId'
	})
	speciality: SpecialityEntity;

	@ManyToOne(() => LanguageEntity, language => language.languageId)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_article_language',
		name: 'language_id',
		referencedColumnName: 'languageId'
	})
	language: LanguageEntity;

	@OneToMany(
		() => FavoriteArticleEntity,
		favoriteArticle => favoriteArticle.article
	)
	favoriteArticle: FavoriteArticleEntity[];

	@OneToOne(() => PostEntity, postInfo => postInfo.article)
	post: PostEntity;
}
