import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ConsultationSessionEntity } from '../../consultation-session/entities/consultation-session.entity';

/**
 * An entity class for interpretation_document table in the database.
 */
@Entity('interpretation_document')
export class InterpretationDocumentEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'interpretation_document_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	interpretationDocumentId: number;

	/**
	 * PK of the table.
	 */
	@Column({
		name: 'consultation_session_id',
		type: 'bigint',
		comment: 'PK of the table.',
		unique: false,
		nullable: false
	})
	consultationSessionId: number;

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
	 * Reference with primary key table - consultation_session to create Many-to-One relationship constraint FK_interpretation_document_consultation_session.
	 */
	@ManyToOne(
		() => ConsultationSessionEntity,
		consultationSession => consultationSession.interpretationDocuments
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_interpretation_document_consultation_session',
		name: 'consultation_session_id',
		referencedColumnName: 'consultationSessionId'
	})
	consultationSession: ConsultationSessionEntity;
}
