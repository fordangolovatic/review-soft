import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { UserAccountResponse } from '@modules/user/user-account/dto/user-account.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
	@ApiProperty({
		required: true,
		example: 13,
		type: Number
	})
	messageId: number;

	@ApiProperty({
		required: true,
		example: 'some message'
	})
	content: string;

	@ApiProperty({
		required: true,
		example: 'message subject'
	})
	subject: string;

	@ApiProperty({
		required: true,
		example: '2022-12-20 10:19:16',
		type: Date
	})
	createdAt: Date;

	@ApiProperty({
		required: true,
		example: false,
		type: Boolean
	})
	isRead: boolean;

	@ApiProperty({
		required: true,
		example: {},
		type: UserAccountResponse
	})
	from: UserAccountResponse;

	@ApiProperty({
		required: true,
		example: {},
		type: UserAccountResponse
	})
	to: UserAccountResponse;

	@ApiProperty({ required: false })
	consultation?: ConsultationSessionEntity;
}
