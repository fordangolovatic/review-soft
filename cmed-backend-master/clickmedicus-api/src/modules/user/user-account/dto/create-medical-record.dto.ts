import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DrinkingStatus } from '../entities/medical-record.entity';

export class CreateMedicalRecordDto {
	@ApiProperty({
		required: false,
		example: 'M'
	})
	@IsOptional()
	gender: string;

	@ApiProperty({
		required: false,
		example: 123
	})
	@IsOptional()
	height: number;

	@ApiProperty({
		required: false,
		example: 123
	})
	@IsOptional()
	weight: number;

	@ApiProperty({
		required: false,
		example: ['', '']
	})
	@IsOptional()
	operations: [];

	@ApiProperty({
		required: false,
		example: ['', '']
	})
	@IsOptional()
	breaks: [];

	@ApiProperty({
		required: false,
		example: ['', '']
	})
	@IsOptional()
	allergies: [];

	@ApiProperty({
		required: false,
		example: ['', '']
	})
	@IsOptional()
	diseases: [];

	@ApiProperty({
		required: false,
		example: ['', '']
	})
	@IsOptional()
	medicaments: [];

	@ApiProperty({
		required: false,
		example: false
	})
	@IsOptional()
	isSmoking: boolean;

	@ApiProperty({
		required: false,
		example: 1
	})
	@IsOptional()
	packsPerDay: number;

	@ApiProperty({
		required: false,
		example: 1
	})
	@IsOptional()
	yearsOfSmoking: number;

	@ApiProperty({
		required: false,
		example: false
	})
	@IsOptional()
	isDrinking: boolean;

	@ApiProperty({
		required: false,
		example: 'occasionally'
	})
	@IsOptional()
	drinkingStatus: DrinkingStatus;
}
