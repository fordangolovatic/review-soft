import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';
import { BaseAbstractRepository } from '@base/repositories/base.repository';

import { QuestionsRepositoryInterface } from '../interfaces/questions.repository.interface';
import { QuestionEntity } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { QueryQuestionsDto } from '../dto/questions-query.dto';

/**
 * A repository for Question table.
 */
@Injectable()
export class QuestionsRepository
	extends BaseAbstractRepository<QuestionEntity>
	implements QuestionsRepositoryInterface
{
	constructor(
		@InjectRepository(QuestionEntity)
		private questionsRepository: Repository<QuestionEntity>,
		@InjectRepository(SpecialityEntity)
		private specialitiesRepository: Repository<SpecialityEntity>,
		@InjectRepository(LanguageEntity)
		private languageRepository: Repository<LanguageEntity>
	) {
		super(questionsRepository);
	}

	async createEntity(
		createQuestionDto: CreateQuestionDto
	): Promise<QuestionEntity> {
		const question = this.questionsRepository.create({
			content: createQuestionDto.content,
			image: createQuestionDto.image,
			title: createQuestionDto.title,
			isAnonymous: createQuestionDto.isAnonymous,
			createdBy: createQuestionDto.createdBy
		});

		if (createQuestionDto.language) {
			const language = await this.languageRepository.findOne({
				where: { languageId: createQuestionDto.language }
			});

			if (language) {
				question.language = language;
			}
		}

		if (createQuestionDto.speciality) {
			const speciality = await this.specialitiesRepository.findOne({
				where: { specialityId: createQuestionDto.speciality }
			});

			if (speciality) {
				question.speciality = speciality;
			}
		}

		return this.questionsRepository.save(question);
	}

	async getAllRecords(
		queryQuestionsDto: QueryQuestionsDto
	): Promise<QuestionEntity[]> {
		const languages = queryQuestionsDto.languages ?? [];
		const specialities = queryQuestionsDto.specialties ?? [];

		const filter = this.formulateFilter(languages, specialities);

		return await this.questionsRepository.find({
			where: filter,
			relations: { speciality: true, language: true, createdBy: true },
			select: {
				language: {
					languageId: true,
					languageName: true
				},
				speciality: {
					specialityId: true,
					specialityName: true
				},
				createdBy: {
					userId: true,
					firstName: true,
					lastName: true
				}
			}
		});
	}

	formulateFilter(languages: string[], specialities: string[]) {
		let filter = [];

		if (specialities.length) {
			filter = [
				{
					speciality: {
						speciality: In(specialities)
					}
				}
			];
		}

		if (languages.length) {
			filter = [
				...filter,
				{
					language: { languageName: In(languages) }
				}
			];
		}

		return filter.length ? filter : [];
	}

	async deleteEntity(questionId: number): Promise<DeleteResult> {
		return this.questionsRepository.delete({
			questionId
		});
	}
}
