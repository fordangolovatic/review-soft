import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserAccountEntity } from '../../../user/user-account/entities/user-account.entity';

/**
 * An entity class for city table in the database.
 */
@Entity('city')
@Index(['cityName'], { unique: true })
export class CityEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'city_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	cityId: number;

	/**
	 * FK to country table.
	 */
	// @Column({
	// 	name: 'country_id',
	// 	type: 'smallint',
	// 	comment: 'FK to country table.',
	// 	nullable: false
	// })
	// countryId: number;

	/**
	 * FK to the state table.
	 */
	// @Column({
	// 	name: 'state_id',
	// 	type: 'int',
	// 	comment: 'FK to the state table.',
	// 	nullable: true
	// })
	// stateId: number;

	/**
	 * Name of the city.
	 */
	@Column({
		name: 'city_name',
		type: 'nvarchar',
		comment: 'Name of the city.',
		length: 100,
		nullable: false
	})
	cityName: string;

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
	 * Reference with primary key table - country to create Many-to-One relationship constraint FK_city_country.
	 */
	// @ManyToOne(() => CountryEntity, country => country.citys)
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_city_country',
	// 	name: 'country_id',
	// 	referencedColumnName: 'countryId'
	// })
	// country: CountryEntity;

	/**
	 * Reference with primary key table - state to create Many-to-One relationship constraint FK_city_state.
	 */
	// @ManyToOne(() => StateEntity, state => state.citys)
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_city_state',
	// 	name: 'state_id',
	// 	referencedColumnName: 'stateId'
	// })
	// state: StateEntity;

	/**
	 * Reference with foreign key table - account to create One-to-Many relationship constraint FK_account_city.
	 */
	@OneToMany(() => UserAccountEntity, account => account.city)
	accounts: UserAccountEntity[];
}
