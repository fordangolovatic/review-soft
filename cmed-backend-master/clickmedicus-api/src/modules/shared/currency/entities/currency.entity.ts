import { Column, Entity, OneToMany } from 'typeorm';
import { ConsultationPriceEntity } from '../../../consultation/consultation-price/entities/consultation-price.entity';
import { AccountWalletTransactionEntity } from '../../../user/wallet/account-wallet-transaction/entities/account-wallet-transaction.entity';
import { WalletOffersEntity } from '../../../user/wallet/wallet-offers/entities/wallet-offers.entity';
import { CoinConversionRateEntity } from '../../coin-conversion-rate/entities/coin-conversion-rate.entity';

/**
 * An entity class for currency table in the database.
 */
@Entity('currency')
export class CurrencyEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'currency_id',
		type: 'smallint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	currencyId: number;

	/**
	 * Name of the currency.
	 */
	@Column({
		name: 'currency_name',
		type: 'nvarchar',
		comment: 'Name of the currency.',
		unique: true,
		length: 500,
		nullable: false
	})
	currencyName: string;

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
	 * Reference with foreign key table - account_wallet_transaction to create One-to-Many relationship constraint FK_account_wallet_transaction_currency.
	 */
	@OneToMany(
		() => AccountWalletTransactionEntity,
		accountWalletTransaction => accountWalletTransaction.currency
	)
	accountWalletTransactions: AccountWalletTransactionEntity[];

	/**
	 * Reference with foreign key table - coin_conversion_rate to create One-to-Many relationship constraint FK_coin_conversion_rate_currency.
	 */
	@OneToMany(
		() => CoinConversionRateEntity,
		coinConversionRate => coinConversionRate.currency
	)
	coinConversionRates: CoinConversionRateEntity[];

	/**
	 * Reference with foreign key table - consultation_price to create One-to-Many relationship constraint FK_consultation_price_currency.
	 */
	@OneToMany(
		() => ConsultationPriceEntity,
		consultationPrice => consultationPrice.currency
	)
	consultationPrices: ConsultationPriceEntity[];

	/**
	 * Reference with foreign key table - wallet_offers to create One-to-Many relationship constraint FK_wallet_offers_currency.
	 */
	@OneToMany(() => WalletOffersEntity, walletOffers => walletOffers.currency)
	walletOfferss: WalletOffersEntity[];
}
