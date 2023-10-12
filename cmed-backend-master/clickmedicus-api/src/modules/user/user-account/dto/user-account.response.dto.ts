import { ApiProperty } from '@nestjs/swagger';

export class UserAccountResponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	userId: number;

	@ApiProperty({
		required: true,
		example: 'Hardik'
	})
	firstName: string;

	@ApiProperty({
		required: true,
		example: 'Sheth'
	})
	lastName: string;

	@ApiProperty({
		required: true,
		example: 'hardik.sheth1717@gmail.com'
	})
	username: string;

	@ApiProperty({
		required: true,
		example: 'hardik.sheth1717@gmail.com'
	})
	email: string;

	@ApiProperty({
		required: true,
		example: 1
	})
	isActive: number;

	@ApiProperty({
		required: true,
		example: ''
	})
	profileImage: string;

	@ApiProperty({
		required: true,
		example: 1
	})
	createdBy: number;

	@ApiProperty({
		required: true,
		example: '2021-11-13T17:55:00.000Z'
	})
	createdDate: Date;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	modifiedBy: string;

	@ApiProperty({
		required: true,
		example: '2022-12-29T19:54:49.000Z'
	})
	modifiedDate: Date;

	@ApiProperty({
		required: true,
		example: 1
	})
	isSystem: number;

	@ApiProperty({
		required: true,
		example: 1
	})
	isConfirmed: number;
}
