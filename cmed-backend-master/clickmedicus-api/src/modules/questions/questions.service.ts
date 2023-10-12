import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QueryQuestionsDto } from './dto/questions-query.dto';
import { QuestionEntity } from './entities/question.entity';
import { QuestionsRepositoryInterface } from './interfaces/questions.repository.interface';
import { QuestionsServiceInterface } from './interfaces/questions.service.interface';

@Injectable()
export class QuestionsService implements QuestionsServiceInterface {
	constructor(
		@Inject(DIToken.QUESTIONS_REPOSITORY_INTERFACE)
		private readonly questionsRepository: QuestionsRepositoryInterface
	) {}

	async create(
		createQuestionDto: CreateQuestionDto,
		user: UserAccountEntity
	): Promise<QuestionEntity> {
		createQuestionDto.createdBy = user;
		return this.questionsRepository.createEntity(createQuestionDto);
	}

	async getAll(query: QueryQuestionsDto): Promise<QuestionEntity[]> {
		return this.questionsRepository.getAllRecords(query);
	}

	async delete(id: number): Promise<void> {
		const result: DeleteResult =
			await this.questionsRepository.deleteEntity(id);

		if (!result.affected) {
			throw new HttpException(
				'Invalid id of Question',
				HttpStatus.NOT_FOUND
			);
		}
	}
}
