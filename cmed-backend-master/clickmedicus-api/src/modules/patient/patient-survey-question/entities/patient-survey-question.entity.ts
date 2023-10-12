import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PatientAnamnesisHistoryEntity } from '../../patient-anamnesis-history/entities/patient-anamnesis-history.entity';
import { SurveyQuestionGroupEntity } from '../../survey-question-group/entities/survey-question-group.entity';

/**
 * An entity class for patient_survey_question table in the database.
 */
@Entity('patient_survey_question')
export class PatientSurveyQuestionEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'patient_survey_question_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	patientSurveyQuestionId: number;

	// /**
	//  * FK to specialit table. If specialty_id is null, than questions will be common for all the specialit.
	//  */
	// @Column({
	// 	name: 'speciality_id',
	// 	type: 'int',
	// 	comment:
	// 		'FK to speciality table. If speciality_id is null, than questions will be common for all the speciality.',
	// 	unique: false,
	// 	nullable: true
	// })
	// specialityId: number;

	/**
	 * FK to the survey_question_group table.
	 */
	@Column({
		name: 'survey_question_group_id',
		type: 'int',
		comment: 'FK to the survey_question_group table.',
		unique: false,
		nullable: true
	})
	surveyQuestionGroupId: number;

	/**
	 * Question
	 */
	@Column({
		name: 'question',
		type: 'nvarchar',
		comment: 'Question',
		unique: false,
		length: 500,
		nullable: false
	})
	question: string;

	/**
	 * Question is mandatory or not.
	 */
	@Column({
		name: 'is_required',
		type: 'boolean',
		comment: 'Question is mandatory or not.',
		unique: false,
		nullable: false
	})
	isRequired: boolean;

	/**
	 * Question is active or not
	 */
	@Column({
		name: 'is_active',
		type: 'boolean',
		comment: 'Question is active or not',
		unique: false,
		nullable: true
	})
	isActive: boolean;

	/**
	 * Show document attachment control
	 */
	@Column({
		name: 'ask_document',
		type: 'boolean',
		comment: 'Show document attachment control',
		unique: false,
		nullable: true
	})
	askDocument: boolean;

	/**
	 * Serial number for ordering of questions.
	 */
	@Column({
		name: 'serial',
		type: 'int',
		comment: 'Serial number for ordering of questions.',
		unique: false,
		nullable: true
	})
	serial: number;

	/**
	 * Reference with primary key table - survey_question_group to create Many-to-One relationship constraint FK_patient_survey_question_survey_question_group.
	 */
	@ManyToOne(
		() => SurveyQuestionGroupEntity,
		surveyQuestionGroup => surveyQuestionGroup.patientSurveyQuestions
	)
	@JoinColumn({
		foreignKeyConstraintName:
			'FK_patient_survey_question_survey_question_group',
		name: 'survey_question_group_id',
		referencedColumnName: 'surveyQuestionGroupId'
	})
	surveyQuestionGroup: SurveyQuestionGroupEntity;

	/**
	 * Reference with primary key table - specialit to create Many-to-One relationship constraint FK_patient_survey_question_specialty.
	 */
	// @ManyToOne(
	// 	() => SpecialityEntity,
	// 	specialit => specialit.patientSurveyQuestions
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_patient_survey_question_speciality',
	// 	name: 'speciality_id',
	// 	referencedColumnName: 'specialityId'
	// })
	// speciality: SpecialityEntity;

	/**
	 * Reference with foreign key table - patient_anamnesis_history to create One-to-Many relationship constraint FK_patient_anamnesis_history_patient_survey_question.
	 */
	@OneToMany(
		() => PatientAnamnesisHistoryEntity,
		patientAnamnesisHistory => patientAnamnesisHistory.patientSurveyQuestion
	)
	patientAnamnesisHistorys: PatientAnamnesisHistoryEntity[];
}
