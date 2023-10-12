import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { QuestionsRepository } from './repositories/questions.repository';
import { QuestionEntity } from './entities/question.entity';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			QuestionEntity,
			SpecialityEntity,
			LanguageEntity
		])
	],
	controllers: [QuestionsController],
	providers: [
		{
			provide: DIToken.QUESTIONS_REPOSITORY_INTERFACE,
			useClass: QuestionsRepository
		},
		{
			provide: DIToken.QUESTIONS_SERVICE_INTERFACE,
			useClass: QuestionsService
		}
	]
})
export class QuestionsModule {}
