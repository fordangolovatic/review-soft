import { ConsultationStatusEnum } from '@core/constants/enums/consultationStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsDateString,
	IsDefined,
	IsInt,
	IsOptional,
	IsPositive,
	Length
} from 'class-validator';

/**
 * A DTO class for consultation.
 */
export class CreateConsultationDto {
	/**
	 * FK to account table.
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	doctorId: number;
	/**
	 * consultation status
	 */
	@IsDefined()
	@IsOptional()
	consultationStatus: ConsultationStatusEnum;

	@IsDefined()
	@IsOptional()
	@ApiProperty({
		required: false,
		example: 'image'
	})
	image: string;

	/**
	 * Is medical record visible?
	 */
	@IsDefined()
	@IsOptional()
	medicalRecordAgreement: boolean;

	/**
	 * Price of the consultation.
	 */
	@IsDefined()
	@IsInt()
	@IsOptional()
	@IsPositive()
	consultationPrice: number;

	/**
	 * Activity id related with the new consultation
	 */
	@IsDefined()
	@IsInt()
	@IsPositive()
	activityId: number;

	/**
	 * Start date and time of the consultation.
	 */
	@IsDefined()
	@IsOptional()
	startTime: string;

	/**
	 * Start date and time of the consultation.
	 */
	@IsDefined()
	@IsOptional()
	endTime: string;

	/**
	 * Start date and time of the consultation.
	 */
	@IsDefined()
	@IsOptional()
	@IsDateString()
	chatStartTime: string;

	/**
	 * Start date and time of the consultation.
	 */
	@IsDefined()
	@IsOptional()
	chatEndTime: string;

	/**
	 * Rating from the patient.
	 */
	@IsDefined()
	@IsOptional()
	rating: number;

	/**
	 * Feedback from the patient.
	 */
	@IsOptional()
	@Length(2, 100)
	feedback: string;

	/**
	 * Who cancelled the appointment? D = Doctor, P = Patient
	 */
	@IsDefined()
	@IsOptional()
	cancelledBy: number;

	/**
	 * Reason for the cancellation of the appointment
	 */
	@IsDefined()
	@IsOptional()
	reasonForCancellation: string;

	@IsDefined()
	@IsOptional()
	treatmentPlan: string;

	@IsDefined()
	@IsOptional()
	comments: string;

	/**
	 * FK to account table.
	 */
	@IsDefined()
	@IsInt()
	@IsOptional()
	translatorId: number;

	/**
	 * Price of the consultation for translator.
	 */
	@IsDefined()
	@IsOptional()
	translatorConsultationPrice: number;

	/**
	 * Is interpretation or consultation?
	 */
	@IsDefined()
	@IsOptional()
	isInterpretation: boolean;
}
