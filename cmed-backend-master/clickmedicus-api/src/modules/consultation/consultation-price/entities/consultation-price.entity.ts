import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
// import { AccountTypeEntity } from '../../../shared/account-type/entities/account-type.entity';
import { CurrencyEntity } from '../../../shared/currency/entities/currency.entity';

/**
 * An entity class for consultation_price table in the database.
 */
@Entity('consultation_price')
export class ConsultationPriceEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'consultation_price_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	consultationPriceId: number;

	// /**
	//  * FK to speciality table.
	//  */
	// @Column({
	// 	name: 'speciality_id',
	// 	type: 'int',
	// 	comment: 'FK to speciality table.',
	// 	unique: false,
	// 	nullable: true
	// })
	// specialityId: number;

	/**
	 * FK to the account_type table.
	 */
	// @Column({
	// 	name: 'account_type_id',
	// 	type: 'tinyint',
	// 	comment: 'FK to the account_type table.',
	// 	unique: false,
	// 	nullable: true
	// })
	// accountTypeId: number;

	/**
	 * Start year for doctor's experience
	 */
	@Column({
		name: 'start_year',
		type: 'smallint',
		comment: "Start year for doctor's experience",
		unique: false,
		nullable: false
	})
	startYear: number;

	/**
	 * End year for doctor's experience
	 */
	@Column({
		name: 'end_year',
		type: 'smallint',
		comment: "End year for doctor's experience",
		unique: false,
		nullable: false
	})
	endYear: number;

	/**
	 * Per session charges for patient in coins.
	 */
	@Column({
		name: 'patient_charges_coins',
		type: 'numeric',
		comment: 'Per session charges for patient in coins.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	patientChargesCoins: number;

	/**
	 * Per hour payment to doctors in local currency.
	 */
	@Column({
		name: 'doctors_fee',
		type: 'numeric',
		comment: 'Per hour payment to doctors in local currency.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: true
	})
	doctorsFee: number;

	/**
	 * FK to the currency table. Currency in which doctor will be paid.
	 */
	@Column({
		name: 'currency_id',
		type: 'smallint',
		comment:
			'FK to the currency table. Currency in which doctor will be paid.',
		unique: false,
		nullable: false
	})
	currencyId: number;

	/**
	 * Reference with primary key table - account_type to create Many-to-One relationship constraint FK_consultation_price_account_type.
	 */
	// @ManyToOne(
	// 	() => AccountTypeEntity,
	// 	accountType => accountType.consultationPrices
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_consultation_price_account_type',
	// 	name: 'account_type_id',
	// 	referencedColumnName: 'accountTypeId'
	// })
	// accountType: AccountTypeEntity;

	/**
	 * Reference with primary key table - currency to create Many-to-One relationship constraint FK_consultation_price_currency.
	 */
	@ManyToOne(() => CurrencyEntity, currency => currency.consultationPrices)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_consultation_price_currency',
		name: 'currency_id',
		referencedColumnName: 'currencyId'
	})
	currency: CurrencyEntity;
	//
	// /**
	//  * Reference with primary key table - speciality to create Many-to-One relationship constraint FK_consultation_price_specialty.
	//  */
	// @ManyToOne(
	// 	() => SpecialityEntity,
	// 	speciality => speciality.consultationPrices
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_consultation_price_speciality',
	// 	name: 'speciality_id',
	// 	referencedColumnName: 'specialityId'
	// })
	// speciality: SpecialityEntity;
}
