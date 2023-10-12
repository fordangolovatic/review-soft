import { DIToken } from '@core/constants/enums/ditoken.enum';
import { User } from '@core/decorators/user.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Controller,
	Get,
	Post,
	Param,
	Delete,
	Inject,
	Body,
	Query
} from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QueryQuestionsDto } from './dto/questions-query.dto';
import { QuestionsResponseDto } from './dto/questions-response.dto';
import { QuestionsServiceInterface } from './interfaces/questions.service.interface';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
	constructor(
		@Inject(DIToken.QUESTIONS_SERVICE_INTERFACE)
		private questionsService: QuestionsServiceInterface
	) {}
	@SwaggerRouteDecorator({
		apiResponseData: { status: 200 },
		apiSecurityData: 'accessToken',
		apiBodyData: {
			type: OmitType(CreateQuestionDto, ['createdBy'] as const)
		}
	})
	@Post()
	create(
		@Body() createQuestionDto: CreateQuestionDto,
		@User() user: UserAccountEntity
	) {
		return this.questionsService.create(createQuestionDto, user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: {
			type: QuestionsResponseDto,
			status: 200,
			isArray: true
		},
		apiSecurityData: 'accessToken',
		apiQueryOptions: [
			{
				name: 'speciality',
				description: 'Specialty to include',
				required: false,
				isArray: true,
				type: 'array',
				example: ['Allergy']
			},
			{
				name: 'languages',
				description: 'Language to include',
				required: false,
				isArray: true,
				type: 'array',
				example: ['English']
			}
		]
	})
	@Get()
	@NoAuthRoute()
	findAll(@Query() query: QueryQuestionsDto) {
		return this.questionsService.getAll(query);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200 },
		apiSecurityData: 'accessToken'
	})
	@Delete(':questionId')
	remove(@Param('questionId') questionId: string) {
		return this.questionsService.delete(+questionId);
	}
}
