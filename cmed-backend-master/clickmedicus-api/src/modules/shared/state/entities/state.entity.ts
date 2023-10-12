import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An entity class for state table in the database.
 */
@Entity('state')
@Index(['stateName'], { unique: true })
export class StateEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'state_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	stateId: number;

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
	 * Name of the state.
	 */
	@Column({
		name: 'state_name',
		type: 'nvarchar',
		comment: 'Name of the state.',
		length: 100,
		nullable: false
	})
	stateName: string;

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
	 * Reference with primary key table - country to create Many-to-One relationship constraint FK_state_country.
	 */
	// @ManyToOne(() => CountryEntity, country => country.states)
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_state_country',
	// 	name: 'country_id',
	// 	referencedColumnName: 'countryId'
	// })
	// country: CountryEntity;

	/**
	 * Reference with foreign key table - city to create One-to-Many relationship constraint FK_city_state.
	 */
	// @OneToMany(() => CityEntity, city => city.state)
	// citys: CityEntity[];
	/**
	 * Reference with foreign key table - account to create One-to-Many relationship constraint FK_account_city.
	 */
	@OneToMany(() => UserAccountEntity, account => account.state)
	accounts: UserAccountEntity[];
}
