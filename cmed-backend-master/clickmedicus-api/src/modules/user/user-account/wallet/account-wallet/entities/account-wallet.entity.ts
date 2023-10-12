import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserAccountEntity } from '../../../entities/user-account.entity';
import { AccountWalletTransactionEntity } from '../../../wallet/account-wallet-transaction/entities/account-wallet-transaction.entity';

/**
 * An entity class for account_wallet table in the database.
 */
@Entity('account_wallet')
export class AccountWalletEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'account_wallet_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	accountWalletId: number;

	/**
	 * FK to account table.
	 */
	@Column({
		name: 'user_id',
		type: 'bigint',
		comment: 'FK to account table.',
		unique: false,
		nullable: false
	})
	userId: number;

	/**
	 * Available balance in portal's coin.
	 */
	@Column({
		name: 'available_balance',
		type: 'numeric',
		comment: "Available balance in portal's coin.",
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	availableBalance: number;

	/**
	 * Date and time of last balance update.
	 */
	@Column({
		name: 'last_updated',
		type: 'datetime',
		comment: 'Date and time of last balance update.',
		unique: false,
		nullable: false
	})
	lastUpdated: string;

	/**
	 * Reference with primary key table - account to create One-to-One relationship constraint FK_account_wallet_account.
	 */
	@OneToOne(() => UserAccountEntity, account => account.accountWallet)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_wallet_account',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	account: UserAccountEntity;

	/**
	 * Reference with foreign key table - account_wallet_transaction to create One-to-Many relationship constraint FK_account_wallet_transaction_account_wallet.
	 */
	@OneToMany(
		() => AccountWalletTransactionEntity,
		accountWalletTransaction => accountWalletTransaction.accountWallet
	)
	accountWalletTransactions: AccountWalletTransactionEntity[];
}
