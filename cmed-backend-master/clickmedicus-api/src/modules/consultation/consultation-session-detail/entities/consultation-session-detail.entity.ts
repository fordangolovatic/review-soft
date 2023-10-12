import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ConsultationOutcomeDocumentEntity } from '../../consultation-outcome-document/entities/consultation-outcome-document.entity';
import { ConsultationOutcomeEntity } from '../../consultation-outcome/entities/consultation-outcome.entity';
import { ConsultationSessionEntity } from '../../consultation-session/entities/consultation-session.entity';

/**
 * An entity class for consultation_session_detail table in the database.
 */
@Entity('consultation_session_detail')
export class ConsultationSessionDetailEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'consultation_session_detail_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	consultationSessionDetailId: number;

	/**
	 * FK to consultation_session table.
	 */
	@Column({
		name: 'consultation_session_id',
		type: 'bigint',
		comment: 'FK to consultation_session table.',
		unique: false,
		nullable: false
	})
	consultationSessionId: number;

	/**
	 * FK to consultation_outcome table.
	 */
	@Column({
		name: 'consultation_outcome_id',
		type: 'bigint',
		comment: 'FK to consultation_outcome table.',
		unique: false,
		nullable: false
	})
	consultationOutcomeId: number;

	/**
	 * Outcome of the consultation session.
	 */
	@Column({
		name: 'consultation_outcome',
		type: 'nvarchar',
		comment: 'Outcome of the consultation session.',
		unique: false,
		length: 1000,
		nullable: false
	})
	consultationOutcome: string;

	/**
	 * Reference with primary key table - consultation_session to create Many-to-One relationship constraint FK_consultation_session_detail_consultation_session.
	 */
	@ManyToOne(
		() => ConsultationSessionEntity,
		consultationSession => consultationSession.consultationSessionDetails
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_consultation_session_detail_consultation_session',
		name: 'consultation_session_id',
		referencedColumnName: 'consultationSessionId'
	})
	consultationSession: ConsultationSessionEntity;

	/**
	 * Reference with primary key table - consultation_outcome to create Many-to-One relationship constraint FK_consultation_session_detail_consultation_outcome.
	 */
	@ManyToOne(
		() => ConsultationOutcomeEntity,
		consultationOutcome => consultationOutcome.consultationSessionDetails
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_consultation_session_detail_consultation_outcome',
		name: 'consultation_outcome_id',
		referencedColumnName: 'consultationOutcomeId'
	})
	consultationOutcomeFk: ConsultationOutcomeEntity;

	/**
	 * Reference with foreign key table - consultation_outcome_document to create One-to-Many relationship constraint FK_consultation_outcome_document_consultation_session_detail.
	 */
	@OneToMany(
		() => ConsultationOutcomeDocumentEntity,
		consultationOutcomeDocument =>
			consultationOutcomeDocument.consultationSessionDetail
	)
	consultationOutcomeDocuments: ConsultationOutcomeDocumentEntity[];
}
