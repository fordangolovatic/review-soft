import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CurrencyEntity } from '@modules/shared/currency/entities/currency.entity';
import { PaymentModeEntity } from '@modules/shared/payment-mode/entities/payment-mode.entity';
import { AccountWalletEntity } from '../../account-wallet/entities/account-wallet.entity';
import { WalletOffersEntity } from '../../wallet-offers/entities/wallet-offers.entity';

/**
 * An entity class for account_wallet_transaction table in the database.
 */
@Entity('account_wallet_transaction')
export class AccountWalletTransactionEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'account_wallet_transaction_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	accountWalletTransactionId: number;

	/**
	 * FK to account_wallet table.
	 */
	@Column({
		name: 'account_wallet_id',
		type: 'bigint',
		comment: 'FK to account_wallet table.',
		unique: false,
		nullable: false
	})
	accountWalletId: number;

	/**
	 * Date and time of the transaction.
	 */
	@Column({
		name: 'transaction_date',
		type: 'datetime',
		comment: 'Date and time of the transaction.',
		unique: false,
		nullable: false
	})
	transactionDate: string;

	/**
	 * Mode of payment like credit card, net banking, etc.
	 */
	@Column({
		name: 'payment_mode_id',
		type: 'tinyint',
		comment: 'Mode of payment like credit card, net banking, etc.',
		unique: false,
		nullable: false
	})
	paymentModeId: number;

	/**
	 * Currency like USD, INR, etc.
	 */
	@Column({
		name: 'currency_id',
		type: 'smallint',
		comment: 'Currency like USD, INR, etc.',
		unique: false,
		nullable: false
	})
	currencyId: number;

	/**
	 * Amount.
	 */
	@Column({
		name: 'amount',
		type: 'numeric',
		comment: 'Amount.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: true
	})
	amount: number;

	/**
	 * Coins credited equivalant to amont.
	 */
	@Column({
		name: 'coins_cr',
		type: 'numeric',
		comment: 'Coins credited equivalant to amont.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	coinsCr: number;

	/**
	 * Coins debited.
	 */
	@Column({
		name: 'coins_dr',
		type: 'numeric',
		comment: 'Coins debited.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	coinsDr: number;

	/**
	 * FK to wallet_offers table.
	 */
	@Column({
		name: 'wallet_offers_id',
		type: 'int',
		comment: 'FK to wallet_offers table.',
		unique: false,
		nullable: true
	})
	walletOffersId: number;

	/**
	 * Reference with primary key table - account_wallet to create Many-to-One relationship constraint FK_account_wallet_transaction_account_wallet.
	 */
	@ManyToOne(
		() => AccountWalletEntity,
		accountWallet => accountWallet.accountWalletTransactions
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_account_wallet_transaction_account_wallet',
		name: 'account_wallet_id',
		referencedColumnName: 'accountWalletId'
	})
	accountWallet: AccountWalletEntity;

	/**
	 * Reference with primary key table - currency to create Many-to-One relationship constraint FK_account_wallet_transaction_currency.
	 */
	@ManyToOne(
		() => CurrencyEntity,
		currency => currency.accountWalletTransactions
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_wallet_transaction_currency',
		name: 'currency_id',
		referencedColumnName: 'currencyId'
	})
	currency: CurrencyEntity;

	/**
	 * Reference with primary key table - payment_mode to create Many-to-One relationship constraint FK_account_wallet_transaction_payment_mode.
	 */
	@ManyToOne(
		() => PaymentModeEntity,
		paymentMode => paymentMode.accountWalletTransactions
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_wallet_transaction_payment_mode',
		name: 'payment_mode_id',
		referencedColumnName: 'paymentModeId'
	})
	paymentMode: PaymentModeEntity;

	/**
	 * Reference with primary key table - wallet_offers to create Many-to-One relationship constraint FK_account_wallet_transaction_wallet_offers.
	 */
	@ManyToOne(
		() => WalletOffersEntity,
		walletOffers => walletOffers.accountWalletTransactions
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_wallet_transaction_wallet_offers',
		name: 'wallet_offers_id',
		referencedColumnName: 'walletOffersId'
	})
	walletOffers: WalletOffersEntity;
}
