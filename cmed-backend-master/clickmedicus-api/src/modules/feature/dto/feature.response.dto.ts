import { ApiProperty } from '@nestjs/swagger';

export class FeatureResponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	featureId: number;
	@ApiProperty({
		required: true,
		example: 1
	})
	featureGroupId: number;
	@ApiProperty({
		required: true,
		example: 'ROLE'
	})
	code: string;
	@ApiProperty({
		required: true,
		example: 'Role.'
	})
	featureName: string;
	@ApiProperty({
		required: true,
		example: 'A master module to manage roles.'
	})
	remarks: string;
	@ApiProperty({
		required: true,
		example: 'null'
	})
	featureImage: string;
	@ApiProperty({
		required: true,
		example: 1
	})
	createdBy: number;
	@ApiProperty({
		required: true,
		example: '2022-12-17T22:00:00.000Z'
	})
	createdDate: Date;
	@ApiProperty({
		required: true,
		example: 'null'
	})
	modifiedBy: string;
	@ApiProperty({
		required: true,
		example: 'null'
	})
	modifiedDate: string;
}
