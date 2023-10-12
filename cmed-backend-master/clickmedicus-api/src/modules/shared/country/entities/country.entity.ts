import { Column, Entity, OneToMany } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An entity class for country table in the database.
 */
@Entity('country')
export class CountryEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'country_id',
		type: 'smallint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	countryId: number;

	/**
	 * Name of the country.
	 */
	@Column({
		name: 'country_name',
		type: 'nvarchar',
		comment: 'Name of the country.',
		unique: true,
		length: 100,
		nullable: false
	})
	countryName: string;

	// /**
	//  * Is country required state.
	//  */
	// @Column({
	// 	name: 'allow_state',
	// 	type: 'boolean',
	// 	comment: 'Is country required state.',
	// 	nullable: false,
	// 	default: false
	// })
	// allowState: boolean;

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
	//
	// /**
	//  * Reference with foreign key table - state to create One-to-Many relationship constraint FK_state_country.
	//  */
	// @OneToMany(() => StateEntity, state => state.country)
	// states: StateEntity[];

	// /**
	//  * Reference with foreign key table - city to create One-to-Many relationship constraint FK_city_country.
	//  */
	// @OneToMany(() => CityEntity, city => city.country)
	// citys: CityEntity[];
	/**
	 * Reference with foreign key table - account to create One-to-Many relationship constraint FK_account_city.
	 */
	@OneToMany(() => UserAccountEntity, account => account.country)
	accounts: UserAccountEntity[];
}
