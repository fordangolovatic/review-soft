import { ConsultationStatusEnum } from '@core/constants/enums/consultationStatus.enum';
import { IsDefined, IsOptional, Length, IsDateString } from 'class-validator';

/**
 * A DTO class for consultation.
 */
export class UpdateConsultationDto {
	/**
	 * consultation status
	 */
	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	consultationStatus: ConsultationStatusEnum;

	/**
	 * Rating from the patient.
	 */
	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	rating: number;

	/**
	 * File from the patient.
	 */
	@IsDefined()
	@IsOptional()
	image: string;

	/**
	 * Start date and time of the consultation.
	 */
	@IsDefined()
	@IsOptional()
	@IsDateString()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	chatStartTime: Date;

	/**
	 * Start date and time of the consultation.
	 */
	@IsDefined()
	@IsOptional()
	@IsDateString()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	chatEndTime: Date;

	/**
	 * Feedback from the patient.
	 */
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	@Length(2, 100)
	feedback: string;

	/**
	 * Who cancelled the appointment? D = Doctor, P = Patient
	 */
	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	cancelledBy: number;

	/**
	 * Reason for the cancellation of the appointment
	 */
	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	reasonForCancellation: string;

	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	treatmentPlan: string;

	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	comments: string;

	/**
	 * Is interpretation or consultation?
	 */
	@IsDefined()
	@IsOptional()
	// @Transform(({ value }: TransformFnParams) => value.trim())
	isInterpretation: boolean;

	/**
	 * Medical record agreement
	 */
	@IsDefined()
	@IsOptional()
	medicalRecordAgreement: boolean;
}
