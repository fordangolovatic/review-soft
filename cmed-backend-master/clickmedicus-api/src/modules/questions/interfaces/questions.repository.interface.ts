import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { DeleteResult } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QueryQuestionsDto } from '../dto/questions-query.dto';
import { QuestionEntity } from '../entities/question.entity';
import { QuestionsRepository } from '../repositories/questions.repository';

/**
 * A contract for [QuestionsRepository]{@link QuestionsRepository} class.
 */
export interface QuestionsRepositoryInterface
  extends BaseRepositoryInterface<QuestionEntity> {
  createEntity(createQuestionDto: CreateQuestionDto): Promise<QuestionEntity>;

  getAllRecords(queryQuestionsDto: QueryQuestionsDto): Promise<QuestionEntity[]> ;

  deleteEntity(id: number): Promise<DeleteResult>;
}
