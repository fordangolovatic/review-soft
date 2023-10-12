import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PatientAnamnesisDocumentEntity } from '../../patient-anamnesis-document/entities/patient-anamnesis-document.entity';
import { PatientAnamnesisEntity } from '../../patient-anamnesis/entities/patient-anamnesis.entity';
import { PatientSurveyQuestionEntity } from '../../patient-survey-question/entities/patient-survey-question.entity';

/**
 * An entity class for patient_anamnesis_history table in the database.
 */
@Entity('patient_anamnesis_history')
export class PatientAnamnesisHistoryEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'patient_anamnesis_history_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	patientAnamnesisHistoryId: number;

	/**
	 * FK to patient_anamnesis table.
	 */
	@Column({
		name: 'patient_anamnesis_id',
		type: 'int',
		comment: 'FK to patient_anamnesis table.',
		unique: false,
		nullable: false
	})
	patientAnamnesisId: number;

	/**
	 * FK to patient_survey_question table.
	 */
	@Column({
		name: 'patient_survey_question_id',
		type: 'int',
		comment: 'FK to patient_survey_question table.',
		unique: false,
		nullable: false
	})
	patientSurveyQuestionId: number;

	/**
	 * Answer of the question.
	 */
	@Column({
		name: 'answer',
		type: 'nvarchar',
		comment: 'Answer of the question.',
		unique: false,
		length: 5000,
		nullable: false
	})
	answer: string;

	/**
	 * Reference with primary key table - patient_anamnesis to create Many-to-One relationship constraint FK_patient_anamnesis_history_patient_anamnesis.
	 */
	@ManyToOne(
		() => PatientAnamnesisEntity,
		patientAnamnesis => patientAnamnesis.patientAnamnesisHistorys
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_patient_anamnesis_history_patient_anamnesis',
		name: 'patient_anamnesis_id',
		referencedColumnName: 'patientAnamnesisId'
	})
	patientAnamnesis: PatientAnamnesisEntity;

	/**
	 * Reference with primary key table - patient_survey_question to create Many-to-One relationship constraint FK_patient_anamnesis_history_patient_survey_question.
	 */
	@ManyToOne(
		() => PatientSurveyQuestionEntity,
		patientSurveyQuestion => patientSurveyQuestion.patientAnamnesisHistorys
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_patient_anamnesis_history_patient_survey_question',
		name: 'patient_survey_question_id',
		referencedColumnName: 'patientSurveyQuestionId'
	})
	patientSurveyQuestion: PatientSurveyQuestionEntity;

	/**
	 * Reference with foreign key table - patient_anamnesis_document to create One-to-Many relationship constraint FK_patient_anamnesis_document_patient_anamnesis_history.
	 */
	@OneToMany(
		() => PatientAnamnesisDocumentEntity,
		patientAnamnesisDocument =>
			patientAnamnesisDocument.patientAnamnesisHistory
	)
	patientAnamnesisDocuments: PatientAnamnesisDocumentEntity[];
}
