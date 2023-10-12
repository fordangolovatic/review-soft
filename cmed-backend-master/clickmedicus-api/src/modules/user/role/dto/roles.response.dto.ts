import { ApiProperty } from '@nestjs/swagger';

export class RolesResponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	roleId: number;
	@ApiProperty({
		required: true,
		example: 'Admin'
	})
	roleName: string;
	@ApiProperty({
		required: true,
		example: 'Admin'
	})
	displayName: string;
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
		example: 32
	})
	modifiedBy: number;

	@ApiProperty({
		required: true,
		example: '2023-02-03T15:49:58.000Z'
	})
	modifiedDate: string;

	@ApiProperty({
		required: true,
		example: true
	})
	isSystem: boolean;

	@ApiProperty({
		required: true,
		example: false
	})
	isForSignup: boolean;

	@ApiProperty({
		required: true,
		example: false
	})
	isDefault: boolean;

	// @ApiProperty({
	// 	required: true,
	// 	example: 62
	// })
	// accountTypeId: number;
}
