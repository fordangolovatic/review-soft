import { Column, Entity } from 'typeorm';

/**
 * An entity class for medical_test_type table in the database.
 */
@Entity('medical_test_type')
export class MedicalTestTypeEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'medical_test_type_id',
		type: 'smallint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	medicalTestTypeId: number;

	/**
	 * Name of the medical test.
	 */
	@Column({
		name: 'medical_test_type_name',
		type: 'nvarchar',
		comment: 'Name of the medical test.',
		unique: false,
		length: 300,
		nullable: false
	})
	medicalTestTypeName: string;

	// /**
	//  * FK to the speciality table.
	//  */
	// @Column({
	// 	name: 'speciality_id',
	// 	type: 'int',
	// 	comment: 'FK to the speciality table.',
	// 	unique: false,
	// 	nullable: false
	// })
	// specialityId: number;

	/**
	 * Description of the medical test.
	 */
	@Column({
		name: 'description',
		type: 'nvarchar',
		comment: 'Description of the medical test.',
		unique: false,
		length: 500,
		nullable: true
	})
	description: string;

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
	//  * Reference with primary key table - speciality to create Many-to-One relationship constraint FK_medical_test_type_specialty.
	//  */
	// @ManyToOne(
	// 	() => SpecialityEntity,
	// 	speciality => speciality.medicalTestTypes
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_medical_test_type_speciality',
	// 	name: 'speciality_id',
	// 	referencedColumnName: 'specialityId'
	// })
	// speciality: SpecialityEntity;
}
