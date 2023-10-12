import { BaseController } from '@base/controller/base.controller';
import { User } from '@core/decorators/user.decorator';
import { DIToken } from '@core/enums/ditoken.enum';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { CreateResponseDto } from '@modules/messages/dto/create.response.dto';
import { MessageResponseDto } from '@modules/messages/dto/message.response.dto';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { MessageServiceInterface } from '@modules/messages/interface/message.service.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@Controller('messages')
export class MessageController extends BaseController {
	constructor(
		@Inject(DIToken.MESSAGES_REPOSITORY_INTERFACE)
		private readonly messageService: MessageServiceInterface
	) {
		super();
	}

	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'message is send.' },
		apiSecurityData: 'accessToken'
	})
	@Post('')
	async sendMessage(
		@Body() body: CreateResponseDto,
		@User() user: UserAccountEntity
	) {
		const result = await this.messageService.sendMessage(
			body.from,
			body.to,
			body.content,
			body.subject,
			user,
			body.consultationId
		);
		return result;
	}

	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'the author can delete owned messages' },
		apiSecurityData: 'accessToken'
	})
	@Delete(':messageId')
	async deleteMessage(
		@Param('messageId') messageId: number,
		@User() user: UserAccountEntity
	) {
		return this.messageService.deleteMessage(messageId, user);
	}

	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'the connected user can read the messages in a conversation'
		},
		apiSecurityData: 'accessToken'
	})
	@Post('/read/:convId')
	async readMessages(
		@Param(':convId') convId: number,
		@User() user: UserAccountEntity
	) {
		return this.messageService.readMessages(convId, user);
	}

	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns last message.'
		},
		apiResponseData: { status: 200, type: MessageResponseDto },
		apiSecurityData: 'accessToken'
	})
	@Get('')
	getLastMessage(@User() user: UserAccountEntity): Promise<MessageEntity> {
		return this.messageService.getLastMessage(user.userId);
	}

	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns messages list.'
		},
		apiResponseData: {
			status: 200,
			type: MessageResponseDto,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@Get(':senderId')
	getMessagesBySenderId(
		@Param('senderId') senderId: number,
		@User() user: UserAccountEntity
	): Promise<Array<MessageEntity>> {
		return this.messageService.getMessagesBySenderId(senderId, user.userId);
	}
}
