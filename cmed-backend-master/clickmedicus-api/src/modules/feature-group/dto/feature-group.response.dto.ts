import { ApiProperty } from '@nestjs/swagger';

export class FeatureGroupResponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	featureGroupId: number;
	@ApiProperty({
		required: true,
		example: 'User Management'
	})
	featureGroupName: string;
	@ApiProperty({
		required: true,
		example: 1
	})
	createdBy: number;
	@ApiProperty({
		required: true,
		example: '2022-12-16T22:00:00.000Z'
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
