import { ApiProperty } from '@nestjs/swagger';

export class RolesFeatureReponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	roleFeatureId: number;
	@ApiProperty({
		required: true,
		example: 1
	})
	roleId: number;
	@ApiProperty({
		required: true,
		example: 1
	})
	featureId: number;
	@ApiProperty({
		required: true,
		example: true
	})
	canCreate: boolean;
	@ApiProperty({
		required: true,
		example: true
	})
	canModify: boolean;
	@ApiProperty({
		required: true,
		example: true
	})
	canView: boolean;

	@ApiProperty({
		required: true,
		example: true
	})
	canDelete: boolean;

	@ApiProperty({
		required: true,
		example: true
	})
	canManage: boolean;
}
