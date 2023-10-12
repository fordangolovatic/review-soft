import { ApiProperty } from '@nestjs/swagger';

export class StatesResponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	stateId: number;
	@ApiProperty({
		required: true,
		example: 1
	})
	countryId: number;
	@ApiProperty({
		required: true,
		example: 'Maharashtra'
	})
	stateName: string;
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
		example: 10
	})
	modifiedBy: number;
	@ApiProperty({
		required: true,
		example: '2022-12-22T19:37:15.000Z'
	})
	modifiedDate: string;
}
