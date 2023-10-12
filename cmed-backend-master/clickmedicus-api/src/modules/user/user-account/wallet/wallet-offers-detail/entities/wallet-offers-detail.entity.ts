import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WalletOffersEntity } from '../../wallet-offers/entities/wallet-offers.entity';

/**
 * An entity class for wallet_offers_detail table in the database.
 */
@Entity('wallet_offers_detail')
export class WalletOffersDetailEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'wallet_offers_detail_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	walletOffersDetailId: number;

	/**
	 * FK to wallet_offers table.
	 */
	@Column({
		name: 'wallet_offers_id',
		type: 'int',
		comment: 'FK to wallet_offers table.',
		unique: false,
		nullable: false
	})
	walletOffersId: number;

	/**
	 * Amount of purchase.
	 */
	@Column({
		name: 'purchase_amount',
		type: 'numeric',
		comment: 'Amount of purchase.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	purchaseAmount: number;

	/**
	 * No of coins to receive on purchase. For example, 50 coins for 10 EURs and 120 coins for 20 EURs.
	 */
	@Column({
		name: 'coins',
		type: 'numeric',
		comment:
			'No of coins to receive on purchase. For example, 50 coins for 10 EURs and 120 coins for 20 EURs.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	coins: number;

	/**
	 * Reference with primary key table - wallet_offers to create Many-to-One relationship constraint FK_wallet_offers_detail_wallet_offers.
	 */
	@ManyToOne(
		() => WalletOffersEntity,
		walletOffers => walletOffers.walletOffersDetails
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_wallet_offers_detail_wallet_offers',
		name: 'wallet_offers_id',
		referencedColumnName: 'walletOffersId'
	})
	walletOffers: WalletOffersEntity;
}
