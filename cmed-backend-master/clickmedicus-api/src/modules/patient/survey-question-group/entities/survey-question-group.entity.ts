import { Column, Entity, OneToMany } from 'typeorm';
import { PatientSurveyQuestionEntity } from '../../patient-survey-question/entities/patient-survey-question.entity';

/**
 * An entity class for survey_question_group table in the database.
 */
@Entity('survey_question_group')
export class SurveyQuestionGroupEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'survey_question_group_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	surveyQuestionGroupId: number;

	/**
	 * Name of the survey question group. eg. Body parameters, Smoker, Alcohol, etc.
	 */
	@Column({
		name: 'survey_question_group_name',
		type: 'nvarchar',
		comment:
			'Name of the survey question group. eg. Body parameters, Smoker, Alcohol, etc.',
		unique: false,
		length: 500,
		nullable: false
	})
	surveyQuestionGroupName: string;

	/**
	 * Description about the group.
	 */
	@Column({
		name: 'description',
		type: 'nvarchar',
		comment: 'Description about the group.',
		unique: false,
		length: 500,
		nullable: true
	})
	description: string;

	/**
	 * Serial number for ordering of question groups.
	 */
	@Column({
		name: 'serial',
		type: 'int',
		comment: 'Serial number for ordering of question groups.',
		unique: false,
		nullable: true
	})
	serial: number;

	/**
	 * Reference with foreign key table - patient_survey_question to create One-to-Many relationship constraint FK_patient_survey_question_survey_question_group.
	 */
	@OneToMany(
		() => PatientSurveyQuestionEntity,
		patientSurveyQuestion => patientSurveyQuestion.surveyQuestionGroup
	)
	patientSurveyQuestions: PatientSurveyQuestionEntity[];
}
