import { ConsultationStatusEnum } from '@core/constants/enums/consultationStatus.enum';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { ActivityProgramEntity } from '@modules/user/user-account/entities/activity-program.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ConsultationSessionDetailEntity } from '../../consultation-session-detail/entities/consultation-session-detail.entity';
import { InterpretationDocumentEntity } from '../../interpretation-document/entities/interpretation-document.entity';

/**
 * An entity class for consultation_session table in the database.
 */
@Entity('consultation_session')
export class ConsultationSessionEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'consultation_session_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	consultationSessionId: number;

	/**
	 * FK for activity_program
	 */
	@ManyToOne(() => ActivityProgramEntity, activity => activity.consultations)
	@JoinColumn({
		name: 'activity_id',
		referencedColumnName: 'id'
	})
	activity: ActivityProgramEntity;

	/**
	 * FK to account table.
	 */

	@ManyToOne(() => UserAccountEntity, user => user.ConsultationPatient)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_consultation_patient_user',
		name: 'patient_id',
		referencedColumnName: 'userId'
	})
	patient: UserAccountEntity;

	/**
	 * FK to account table.
	 */

	@ManyToOne(() => UserAccountEntity, doctor => doctor.ConsultationDoctor)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_consultation_doctor_user',
		name: 'doctor_id',
		referencedColumnName: 'userId'
	})
	doctor: UserAccountEntity;

	/**
	 *  consultation_status .
	 */
	@Column({
		name: 'consultation_status',
		type: 'varchar',
		comment: 'Consultation status',
		default: ConsultationStatusEnum.PENDING,
		unique: false,
		nullable: false
	})
	consultationStatus: ConsultationStatusEnum;

	/**
	 * Price of the consultation.
	 */
	@Column({
		name: 'consultation_price',
		type: 'numeric',
		comment: 'Price of the consultation.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: false
	})
	consultationPrice: number;

	/**
	 * Start date and time of the consultation.
	 */
	@Column({
		name: 'start_time',
		type: 'varchar',
		comment: 'Start date and time of the consultation.',
		unique: false,
		nullable: false
	})
	startTime: string;

	/**
	 * End date and time of the consultation.
	 */
	@Column({
		name: 'end_time',
		type: 'varchar',
		comment: 'End date and time of the consultation.',
		unique: false,
		nullable: true
	})
	endTime: string;

	/**
	 * Chat start date and time of the consultation.
	 */
	@Column({
		name: 'chat_start_time',
		type: 'datetime',
		comment: 'Chat start date and time of the consultation.',
		unique: false,
		nullable: true
	})
	chatStartTime: string;

	/**
	 * Chat end date and time of the consultation.
	 */
	@Column({
		name: 'chat_end_time',
		type: 'datetime',
		comment: 'Chat end date and time of the consultation.',
		unique: false,
		nullable: true
	})
	chatEndTime: string;

	/**
	 * Rating from the patient.
	 */
	@Column({
		name: 'rating',
		type: 'numeric',
		comment: 'Rating from the patient.',
		unique: false,
		precision: 3,
		scale: 2,
		nullable: true
	})
	rating: number;

	/**
	 * Feedback from the patient.
	 */
	@Column({
		name: 'feedback',
		type: 'nvarchar',
		comment: 'Feedback from the patient.',
		unique: false,
		length: 500,
		nullable: true
	})
	feedback: string;

	/**
	 * Who cancelled the appointment? D = Doctor, P = Patient
	 */

	@ManyToOne(() => UserAccountEntity, user => user.ConsultationCancelled)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_consultation_cancelled_user',
		name: 'user_cancelled',
		referencedColumnName: 'userId'
	})
	cancelledBy: UserAccountEntity;

	/**
	 * Reason for the cancellation of the appointment
	 */
	@Column({
		name: 'reason_for_cancellation',
		type: 'nvarchar',
		comment: 'Reason for the cancellation of the appointment',
		unique: false,
		length: 500,
		nullable: true
	})
	reasonForCancellation: string;

	/**
	 * FK to account table.
	 */
	@Column({
		name: 'translator_id',
		type: 'bigint',
		comment: 'FK to account table.',
		unique: false,
		nullable: true
	})
	translatorId: number;
	/**
	 * Treatment Plan from the patient.
	 */
	@Column({
		name: 'treatment_plan',
		type: 'varchar',
		comment: 'Treatment Plan of the consultation.',
		length: 500,
		nullable: true
	})
	treatmentPlan: string;

	/**
	 * comment.
	 */
	@Column({
		name: 'comments',
		type: 'varchar',
		comment: 'Comment of the consultation.',
		length: 500,
		nullable: true
	})
	comments: string;

	/**
	 * FK to account table.
	 */
	@Column({
		name: 'patient_id',
		type: 'bigint',
		comment: 'FK to account table.',
		unique: false,
		nullable: true
	})
	patientId: number;

	/**
	 * FK to account table.
	 */
	@Column({
		name: 'doctor_id',
		type: 'int',
		comment: 'FK to account table.',
		unique: false,
		nullable: true
	})
	doctorId: number;

	@Column({
		name: 'consultation_image',
		type: 'varchar',
		length: 500,
		comment: 'Consultation image path.',
		nullable: true
	})
	image: string;

	/**
	 * contact.
	 */
	@Column('simple-array', { nullable: true, name: 'contact' })
	contacts: string[];

	/**
	 * Price of the consultation for translator.
	 */
	@Column({
		name: 'translator_consultation_price',
		type: 'numeric',
		comment: 'Price of the consultation for translator.',
		unique: false,
		precision: 18,
		scale: 2,
		nullable: true
	})
	translatorConsultationPrice: number;

	/**
	 * Is interpretation or consultation?
	 */
	@Column({
		name: 'is_interpretation',
		type: 'boolean',
		comment: 'Is interpretation or consultation?',
		unique: false,
		nullable: true
	})
	isInterpretation: boolean;

	/**
	 * Medical record agreement
	 */
	@Column({
		name: 'medical_record_agreement',
		type: 'boolean',
		comment: 'medical record agreement',
		unique: false,
		nullable: true
	})
	medicalRecordAgreement: boolean;

	/**
	 * Reference with primary key table - consultation_status to create Many-to-One relationship constraint FK_consultation_session_consultation_status.
	 */
	// @ManyToOne(
	// 	() => ConsultationStatusEntity,
	// 	consultationStatus => consultationStatus.consultationSessions
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_consultation_session_consultation_status',
	// 	name: 'consultation_status_id',
	// 	referencedColumnName: 'consultationStatusId'
	// })
	// consultationStatus: ConsultationStatusEntity;

	/**
	 * Reference with primary key table - account to create Many-to-One relationship constraint FK_consultation_session_account.
	 */
	// @ManyToOne(
	// 	() => UserAccountEntity,
	// 	account => account.patientConsultationSessions
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_consultation_session_account',
	// 	name: 'user_id',
	// 	referencedColumnName: 'userId'
	// })
	// patient: UserAccountEntity;

	/**
	 * Reference with primary key table - account to create Many-to-One relationship constraint FK_consultation_session_account1.
	 */
	// @ManyToOne(
	// 	() => UserAccountEntity,
	// 	account => account.doctorConsultationSessions
	// )
	// @JoinColumn({
	// 	foreignKeyConstraintName: 'FK_consultation_session_account1',
	// 	name: 'user_id',
	// 	referencedColumnName: 'userId'
	// })
	// doctor: UserAccountEntity;

	/**
	 * Reference with primary key table - account to create Many-to-One relationship constraint FK_consultation_session_account2.
	 */
	@ManyToOne(
		() => UserAccountEntity,
		account => account.translatorConsultationSessions
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_consultation_session_account2',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	translator: UserAccountEntity;

	/**
	 * Reference with foreign key table - consultation_session_detail to create One-to-Many relationship constraint FK_consultation_session_detail_consultation_session.
	 */
	@OneToMany(
		() => ConsultationSessionDetailEntity,
		consultationSessionDetail =>
			consultationSessionDetail.consultationSession
	)
	consultationSessionDetails: ConsultationSessionDetailEntity[];

	/**
	 * Reference with foreign key table - interpretation_document to create One-to-Many relationship constraint FK_interpretation_document_consultation_session.
	 */

	@OneToMany(
		() => InterpretationDocumentEntity,
		interpretationDocument => interpretationDocument.consultationSession
	)
	interpretationDocuments: InterpretationDocumentEntity[];
	consultation: UserAccountEntity;

	@OneToMany(() => UserAccountEntity, account => account.userId)
	account: UserAccountEntity[];

	@OneToMany(() => MessageEntity, message => message.messageId)
	message: MessageEntity[];
}
