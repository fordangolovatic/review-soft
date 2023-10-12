import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DocumentTypeEntity } from '../../../shared/document-type/entities/document-type.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * An entity class for account_document table in the database.
 */
@Entity('account_document')
export class AccountDocumentEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'account_document_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	accountDocumentId: number;

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
	 * FK to the document_type table.
	 */
	@Column({
		name: 'document_type_id',
		type: 'int',
		comment: 'FK to the document_type table.',
		unique: false,
		nullable: false
	})
	documentTypeId: number;

	/**
	 * Original name of the document.
	 */
	@Column({
		name: 'document_name',
		type: 'nvarchar',
		comment: 'Original name of the document.',
		unique: false,
		length: 5000,
		nullable: false
	})
	documentName: string;

	/**
	 * System defined name of the document.
	 */
	@Column({
		name: 'system_name',
		type: 'nvarchar',
		comment: 'System defined name of the document.',
		unique: false,
		length: 5000,
		nullable: false
	})
	systemName: string;

	/**
	 * Full path to the document.
	 */
	@Column({
		name: 'full_path',
		type: 'nvarchar',
		comment: 'Full path to the document.',
		unique: false,
		length: 5000,
		nullable: false
	})
	fullPath: string;

	/**
	 * Mime type
	 */
	@Column({
		name: 'mime_type',
		type: 'nvarchar',
		comment: 'Mime type',
		unique: false,
		length: 50,
		nullable: false
	})
	mimeType: string;

	/**
	 * Size of the document in KB.
	 */
	@Column({
		name: 'size_kb',
		type: 'int',
		comment: 'Size of the document in KB.',
		unique: false,
		nullable: false
	})
	sizeKb: number;

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
	 * Reference with primary key table - document_type to create Many-to-One relationship constraint FK_account_document_document_type.
	 */
	@ManyToOne(
		() => DocumentTypeEntity,
		documentType => documentType.accountDocuments
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_document_document_type',
		name: 'document_type_id',
		referencedColumnName: 'documentTypeId'
	})
	documentType: DocumentTypeEntity;

	/**
	 * Reference with primary key table - account to create Many-to-One relationship constraint FK_account_document_account.
	 */
	@ManyToOne(() => UserAccountEntity, account => account.accountDocuments)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_document_account',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	account: UserAccountEntity;
}
