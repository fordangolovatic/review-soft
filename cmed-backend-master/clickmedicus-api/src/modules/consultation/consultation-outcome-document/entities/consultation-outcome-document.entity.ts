import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ConsultationSessionDetailEntity } from '../../consultation-session-detail/entities/consultation-session-detail.entity';

/**
 * An entity class for consultation_outcome_document table in the database.
 */
@Entity('consultation_outcome_document')
export class ConsultationOutcomeDocumentEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'consultation_outcome_document_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	consultationOutcomeDocumentId: number;

	/**
	 * FK to consultation_session_detail table.
	 */
	@Column({
		name: 'consultation_session_detail_id',
		type: 'bigint',
		comment: 'FK to consultation_session_detail table.',
		unique: false,
		nullable: false
	})
	consultationSessionDetailId: number;

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
	 * Reference with primary key table - consultation_session_detail to create Many-to-One relationship constraint FK_consultation_outcome_document_consultation_session_detail.
	 */
	@ManyToOne(
		() => ConsultationSessionDetailEntity,
		consultationSessionDetail =>
			consultationSessionDetail.consultationOutcomeDocuments
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_consultation_outcome_document_consultation_session_detail',
		name: 'consultation_session_detail_id',
		referencedColumnName: 'consultationSessionDetailId'
	})
	consultationSessionDetail: ConsultationSessionDetailEntity;
}
