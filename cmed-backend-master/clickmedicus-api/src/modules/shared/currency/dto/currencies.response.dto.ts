import { ApiProperty } from '@nestjs/swagger';

export class CurrenciesReponse {
	@ApiProperty({
		required: true,
		example: 1
	})
	currencyId: number;
	@ApiProperty({
		required: true,
		example: 'Doctor'
	})
	currencyName: string;
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
		example: 'null'
	})
	modifiedBy: string;
	@ApiProperty({
		required: true,
		example: 'null'
	})
	modifiedDate: string;
}
