import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LanguageEntity } from '../../../../shared/language/entities/language.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An entity class for account_consultation_price table in the database.
 */
@Entity('account_consultation_price')
export class AccountConsultationPriceEntity {
	/**
	 * PF of the table.
	 */
	@Column({
		name: 'account_consultation_price_id',
		type: 'bigint',
		comment: 'PF of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	accountConsultationPriceId: number;

	/**
	 * Price of consultation in Portal coin.
	 */
	@Column({
		name: 'consultation_price',
		type: 'numeric',
		comment: 'Price of consultation in Portal coin.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	consultationPrice: number;

	/**
	 * Date and time from which this price will take effect.
	 */
	@Column({
		name: 'start_date',
		type: 'datetime',
		comment: 'Date and time from which this price will take effect.',
		unique: false,
		nullable: false
	})
	startDate: string;

	/**
	 * Date and time after which this price will no longer effect.
	 */
	@Column({
		name: 'end_date',
		type: 'datetime',
		comment: 'Date and time after which this price will no longer effect.',
		unique: false,
		nullable: true
	})
	endDate: string;

	/**
	 * FK to the language table.
	 */
	@Column({
		name: 'language_id',
		type: 'int',
		comment: 'FK to the language table.',
		unique: false,
		nullable: true
	})
	languageId: number;

	/**
	 * Reference with primary key table - language to create Many-to-One relationship constraint FK_account_consultation_price_language.
	 */
	@ManyToOne(
		() => LanguageEntity,
		language => language.accountConsultationPrices
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_consultation_price_language',
		name: 'language_id',
		referencedColumnName: 'languageId'
	})
	language: LanguageEntity;

	/**
	 * Reference with primary key table - account to create Many-to-One relationship constraint FK_account_consultation_price_account.
	 */
	@ManyToOne(
		() => UserAccountEntity,
		account => account.accountConsultationPrices
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_consultation_price_account',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	account: UserAccountEntity;
}
