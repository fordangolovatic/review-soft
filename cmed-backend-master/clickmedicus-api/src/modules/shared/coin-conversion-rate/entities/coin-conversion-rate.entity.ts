import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CurrencyEntity } from '../../currency/entities/currency.entity';

/**
 * An entity class for coin_conversion_rate table in the database.
 */
@Entity('coin_conversion_rate')
export class CoinConversionRateEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'coin_conversion_rate_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	coinConversionRateId: number;

	/**
	 * Rate effective from.
	 */
	@Column({
		name: 'start_date',
		type: 'datetime',
		comment: 'Rate effective from.',
		unique: false,
		nullable: false
	})
	startDate: string;

	/**
	 * Rate effective till.
	 */
	@Column({
		name: 'end_date',
		type: 'datetime',
		comment: 'Rate effective till.',
		unique: false,
		nullable: true
	})
	endDate: string;

	/**
	 * FK to currency table. Source currency like USD, EUR, etc.
	 */
	@Column({
		name: 'currency_id',
		type: 'smallint',
		comment: 'FK to currency table. Source currency like USD, EUR, etc.',
		unique: false,
		nullable: false
	})
	currencyId: number;

	/**
	 * Protal coins. Ex. 1 EUR = 5 coins.
	 */
	@Column({
		name: 'rate',
		type: 'numeric',
		comment: 'Protal coins. Ex. 1 EUR = 5 coins.',
		unique: false,
		precision: 5,
		scale: 2,
		nullable: false
	})
	rate: number;

	/**
	 * Reference with primary key table - currency to create Many-to-One relationship constraint FK_coin_conversion_rate_currency.
	 */
	@ManyToOne(() => CurrencyEntity, currency => currency.coinConversionRates)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_coin_conversion_rate_currency',
		name: 'currency_id',
		referencedColumnName: 'currencyId'
	})
	currency: CurrencyEntity;
}
