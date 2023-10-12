import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PatientAnamnesisHistoryEntity } from '../../patient-anamnesis-history/entities/patient-anamnesis-history.entity';

/**
 * An entity class for patient_anamnesis_document table in the database.
 */
@Entity('patient_anamnesis_document')
export class PatientAnamnesisDocumentEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'patient_anamnesis_document_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	patientAnamnesisDocumentId: number;

	/**
	 * FK to patient_anamnesis_history table.
	 */
	@Column({
		name: 'patient_anamnesis_history_id',
		type: 'int',
		comment: 'FK to patient_anamnesis_history table.',
		unique: false,
		nullable: false
	})
	patientAnamnesisHistoryId: number;

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
	 * Reference with primary key table - patient_anamnesis_history to create Many-to-One relationship constraint FK_patient_anamnesis_document_patient_anamnesis_history.
	 */
	@ManyToOne(
		() => PatientAnamnesisHistoryEntity,
		patientAnamnesisHistory =>
			patientAnamnesisHistory.patientAnamnesisDocuments
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_patient_anamnesis_document_patient_anamnesis_history',
		name: 'patient_anamnesis_history_id',
		referencedColumnName: 'patientAnamnesisHistoryId'
	})
	patientAnamnesisHistory: PatientAnamnesisHistoryEntity;
}
