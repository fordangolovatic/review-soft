import { QuestionEntity } from '@modules/questions/entities/question.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ForumEntity } from '../../../forum/forum/entities/forum.entity';
import { AccountConsultationPriceEntity } from '../../../user/user-account/account-consultation-price/entities/account-consultation-price.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An entity class for language table in the database.
 */
@Entity('language')
export class LanguageEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'language_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	languageId: number;

	/**
	 * Name of the language.
	 */
	@Column({
		name: 'language_name',
		type: 'nvarchar',
		comment: 'Name of the language.',
		unique: true,
		length: 50,
		nullable: false
	})
	languageName: string;

	/**
	 * Short code for language.
	 */
	@Column({
		name: 'short_code',
		type: 'nvarchar',
		comment: 'Short code for language.',
		unique: true,
		length: 10,
		nullable: false
	})
	shortCode: string;

	/**
	 * User id of a user who created the record.
	 */
	@Column({
		name: 'created_by',
		type: 'int',
		comment: 'User id of a user who created the record.',
		unique: false,
		nullable: false
	})
	createdBy: number;

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
	 * User id of a user who modified the record.
	 */
	@Column({
		name: 'modified_by',
		type: 'int',
		comment: 'User id of a user who modified the record.',
		unique: false,
		nullable: true
	})
	modifiedBy: number;

	/**
	 * Date and time when the record is modified.
	 */
	@Column({
		name: 'modified_date',
		type: 'datetime',
		comment: 'Date and time when the record is modified.',
		unique: false,
		nullable: true
	})
	modifiedDate: string;

	/**
	 * Reference with foreign key table - account_consultation_price to create One-to-Many relationship constraint FK_account_consultation_price_language.
	 */
	@OneToMany(
		() => AccountConsultationPriceEntity,
		accountConsultationPrice => accountConsultationPrice.language
	)
	accountConsultationPrices: AccountConsultationPriceEntity[];

	/**
	 * Reference with foreign key table - forum to create One-to-Many relationship constraint FK_forum_language.
	 */
	@OneToMany(() => ForumEntity, forum => forum.language)
	forums: ForumEntity[];

	/**
	 * Reference with foreign key table - account_language to create Many-to-Many relationship constraint FK_account_language_language.
	 */
	@ManyToMany(() => UserAccountEntity, account => account.languages)
	accounts: UserAccountEntity[];

	@OneToMany(() => QuestionEntity, questions => questions.language)
	questions: QuestionEntity[];
}
