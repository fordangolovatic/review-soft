import { ApiProperty } from '@nestjs/swagger';

export interface RatingItem {
	rate: number;
	consultations: number;
}

export class DoctorDto {

	@ApiProperty({
		required: true,
		example: 'Inna'
	})
	firstName: string;

	@ApiProperty({
		required: true,
		example: 'Tovbina'
	})
	lastName: string;

	@ApiProperty({
		required: true,
		example: []
	})
	specialties: [];

	@ApiProperty({
		required: true,
		type: 'object',
		example: {
			accountTypeName: 'Doctor'
		}
	})
	accountType: string;

	@ApiProperty({
		required: false,
		example: 12
	})
	yearsExperience: number;

	@ApiProperty({
		required: true,
		example: 'Street'
	})
	address: string;

	@ApiProperty({
		required: true,
		example: 'innatovbina@gmail.com'
	})
	email: string;

	@ApiProperty({
		required: true,
		example: '2021-04-05'
	})
	dateOfBirth: Date;

	@ApiProperty({
		required: false,
		example: ''
	})
	profileImage: string;

	@ApiProperty({
		required: false,
		example: 'Moldova'
	})
	city: string;

	@ApiProperty({
		required: true,
		example: [
			{
				languageId: 16,
				languageName: 'English',
				shortCode: 'EN',
				createdBy: 93,
				createdDate: '2023-04-05T12:17:39.000Z',
				modifiedBy: null,
				modifiedDate: null
			}
		]
	})
	languages: [];

	@ApiProperty({
		required: true,
		example: [
			{
				professionalExperienceId: 234,
				speciality: 'sssaaaaaaa',
				position: 'test 18 18',
				location: 'location',
				startDate: '2005-12-31T22:00:00.000Z',
				endDate: '2001-12-31T22:00:00.000Z',
				isOngoing: true
			}
		]
	})
	professionalExperience: [];
}
