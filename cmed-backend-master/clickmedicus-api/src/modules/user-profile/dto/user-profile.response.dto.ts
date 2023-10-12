import { ApiProperty } from '@nestjs/swagger';

type City = {
	cityId: number;
	countryId: number;
	stateId: number;
};

export class UserProfileResponse {
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
		example: 'null'
	})
	profileImage: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	address: string;

	@ApiProperty({
		required: true,
		example: 'rlx98562@zslsz.com'
	})
	email: string;

	@ApiProperty({
		required: true,
		example: 'null'
	})
	dateOfBirth: string;

	@ApiProperty({
		required: true,
		example: {
			cityId: 1,
			countryId: 1,
			stateId: 1
		}
	})
	city: City[];

	@ApiProperty({
		required: true,
		example: {}
	})
	languages: number[];
}
