import { Column, Entity, OneToMany } from 'typeorm';
import { ConsultationSessionDetailEntity } from '../../consultation-session-detail/entities/consultation-session-detail.entity';

/**
 * An entity class for consultation_outcome table in the database.
 */
@Entity('consultation_outcome')
export class ConsultationOutcomeEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'consultation_outcome_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	consultationOutcomeId: number;

	/**
	 * Outcome details like Diagnosis, Prescribed treatment, etc.
	 */
	@Column({
		name: 'consultation_outcom_name',
		type: 'nvarchar',
		comment: 'Outcome details like Diagnosis, Prescribed treatment, etc.',
		unique: false,
		length: 200,
		nullable: false
	})
	consultationOutcomName: string;

	/**
	 * Reference with foreign key table - consultation_session_detail to create One-to-Many relationship constraint FK_consultation_session_detail_consultation_outcome.
	 */
	@OneToMany(
		() => ConsultationSessionDetailEntity,
		consultationSessionDetail =>
			consultationSessionDetail.consultationOutcomeFk
	)
	consultationSessionDetails: ConsultationSessionDetailEntity[];
}
