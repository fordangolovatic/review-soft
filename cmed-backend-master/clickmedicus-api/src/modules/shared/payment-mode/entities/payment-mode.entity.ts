import { Column, Entity, OneToMany } from 'typeorm';
import { AccountWalletTransactionEntity } from '../../../user/wallet/account-wallet-transaction/entities/account-wallet-transaction.entity';

/**
 * An entity class for payment_mode table in the database.
 */
@Entity('payment_mode')
export class PaymentModeEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'payment_mode_id',
		type: 'tinyint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	paymentModeId: number;

	/**
	 * Name of the payment mode.
	 */
	@Column({
		name: 'payment_mode_name',
		type: 'nvarchar',
		comment: 'Name of the payment mode.',
		unique: false,
		length: 100,
		nullable: false
	})
	paymentModeName: string;

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
	 * Reference with foreign key table - account_wallet_transaction to create One-to-Many relationship constraint FK_account_wallet_transaction_payment_mode.
	 */
	@OneToMany(
		() => AccountWalletTransactionEntity,
		accountWalletTransaction => accountWalletTransaction.paymentMode
	)
	accountWalletTransactions: AccountWalletTransactionEntity[];
}
