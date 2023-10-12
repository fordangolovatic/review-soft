import { ApiProperty } from '@nestjs/swagger';

export class UsersProfileResponse {
	@ApiProperty({
		required: true,
		example: 54
	})
	userId: number;
	@ApiProperty({
		required: true,
		example: 'dr. John'
	})
	firstName: string;
	@ApiProperty({
		required: true,
		example: 'Clark'
	})
	lastName: string;
	@ApiProperty({
		required: true,
		example: 62
	})
	// accountTypeId: number;
	// @ApiProperty({
	// 	required: true,
	// 	example: 'Admin'
	// })
	accountTypeName: string;

	@ApiProperty({
		required: true,
		example: 'M'
	})
	gender: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	address: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	postalCode: string;

	@ApiProperty({
		required: true,
		example: 'rlx98562@zslsz.com'
	})
	email: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	parentAccountId: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	dateOfBirth: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	profileImage: string;

	@ApiProperty({
		required: true,
		example: 0
	})
	isTranslator: number;

	@ApiProperty({
		required: true,
		example: 0
	})
	isVerified: number;

	@ApiProperty({
		required: true,
		example: 0
	})
	termsAndConditionAccepted: number;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	countryId: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	countryName: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	stateId: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	stateName: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	cityId: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	cityName: string;
}
