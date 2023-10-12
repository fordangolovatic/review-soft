import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AccountDocumentEntity } from '../../../user/account-document/entities/account-document.entity';
// import { AccountTypeEntity } from '../../account-type/entities/account-type.entity';

/**
 * An entity class for document_type table in the database.
 */
@Entity('document_type')
export class DocumentTypeEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'document_type_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	documentTypeId: number;

	/**
	 * FK to the account_type table.
	 */
	@Column({
		name: 'account_type_id',
		type: 'tinyint',
		comment: 'FK to the account_type table.',
		unique: false,
		nullable: false
	})
	accountTypeId: number;

	/**
	 * Name of the document type.
	 */
	@Column({
		name: 'document_type_name',
		type: 'nvarchar',
		comment: 'Name of the document type.',
		unique: false,
		length: 100,
		nullable: false
	})
	documentTypeName: string;

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
	 * Reference with primary key table - account_type to create Many-to-One relationship constraint FK_document_type_account_type.
	 */
	// @ManyToOne(
	// 	() => AccountTypeEntity,
	// 	accountType => accountType.documentTypes
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_document_type_account_type',
	// 	name: 'account_type_id',
	// 	referencedColumnName: 'accountTypeId'
	// })
	// accountType: AccountTypeEntity;

	/**
	 * Reference with foreign key table - account_document to create One-to-Many relationship constraint FK_account_document_document_type.
	 */
	@OneToMany(
		() => AccountDocumentEntity,
		accountDocument => accountDocument.documentType
	)
	accountDocuments: AccountDocumentEntity[];
}
