import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CurrencyEntity } from '@modules/shared/currency/entities/currency.entity';
import { AccountWalletTransactionEntity } from '../../account-wallet-transaction/entities/account-wallet-transaction.entity';
import { WalletOffersDetailEntity } from '../../wallet-offers-detail/entities/wallet-offers-detail.entity';

/**
 * An entity class for wallet_offers table in the database.
 */
@Entity('wallet_offers')
export class WalletOffersEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'wallet_offers_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	walletOffersId: number;

	/**
	 * Name of the offer.
	 */
	@Column({
		name: 'wallet_offers_name',
		type: 'nvarchar',
		comment: 'Name of the offer.',
		unique: false,
		length: 500,
		nullable: false
	})
	walletOffersName: string;

	/**
	 * FK to currency table.
	 */
	@Column({
		name: 'currency_id',
		type: 'smallint',
		comment: 'FK to currency table.',
		unique: false,
		nullable: false
	})
	currencyId: number;

	/**
	 * Offer start date.
	 */
	@Column({
		name: 'offer_start_date',
		type: 'datetime',
		comment: 'Offer start date.',
		unique: false,
		nullable: false
	})
	offerStartDate: string;

	/**
	 * Offer end date.
	 */
	@Column({
		name: 'offer_end_date',
		type: 'datetime',
		comment: 'Offer end date.',
		unique: false,
		nullable: true
	})
	offerEndDate: string;

	/**
	 * Reference with primary key table - currency to create Many-to-One relationship constraint FK_wallet_offers_currency.
	 */
	@ManyToOne(() => CurrencyEntity, currency => currency.walletOfferss)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_wallet_offers_currency',
		name: 'currency_id',
		referencedColumnName: 'currencyId'
	})
	currency: CurrencyEntity;

	/**
	 * Reference with foreign key table - wallet_offers_detail to create One-to-Many relationship constraint FK_wallet_offers_detail_wallet_offers.
	 */
	@OneToMany(
		() => WalletOffersDetailEntity,
		walletOffersDetail => walletOffersDetail.walletOffers
	)
	walletOffersDetails: WalletOffersDetailEntity[];

	/**
	 * Reference with foreign key table - account_wallet_transaction to create One-to-Many relationship constraint FK_account_wallet_transaction_wallet_offers.
	 */
	@OneToMany(
		() => AccountWalletTransactionEntity,
		accountWalletTransaction => accountWalletTransaction.walletOffers
	)
	accountWalletTransactions: AccountWalletTransactionEntity[];
}
