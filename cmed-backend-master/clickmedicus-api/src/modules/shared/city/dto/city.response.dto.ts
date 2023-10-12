import { ApiProperty } from '@nestjs/swagger';

export class CityResponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	cityId: number;
	@ApiProperty({
		required: true,
		example: 1
	})
	countryId: number;
	@ApiProperty({
		required: true,
		example: 1
	})
	stateId: number;
	@ApiProperty({
		required: true,
		example: 'Surat'
	})
	cityName: string;
	@ApiProperty({
		required: true,
		example: 1
	})
	createdBy: number;
	@ApiProperty({
		required: true,
		example: '2022-12-19T22:00:00.000Z'
	})
	createdDate: string;
	@ApiProperty({
		required: true,
		example: 1
	})
	modifiedBy: number;
	@ApiProperty({
		required: true,
		example: '2022-12-23T19:27:12.000Z'
	})
	modifiedDate: string;
}
