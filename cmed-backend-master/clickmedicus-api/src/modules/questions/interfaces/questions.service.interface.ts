import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QueryQuestionsDto } from '../dto/questions-query.dto';

/**
 * A service contract which must be implemented by [QuestionsService]{@link QuestionsService}.
 */
export interface QuestionsServiceInterface {
	create(createQuestionDto: CreateQuestionDto, user: UserAccountEntity);
	getAll(query: QueryQuestionsDto);
	delete(id: number);
}
