import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { LanguageEntity } from '@modules/shared/language/entities/language.entity';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('question')
export class QuestionEntity {
	@Column({
		name: 'question_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	questionId: number;

	@Column({
		name: 'title',
		type: 'nvarchar',
		comment: 'Title of question',
		unique: false,
		length: 1000,
		nullable: true
	})
	title: string;

	@Column({
		name: 'content',
		type: 'nvarchar',
		comment: 'Content of question',
		unique: false,
		length: 1000,
		nullable: true
	})
	content: string;

	@Column({
		name: 'image',
		type: 'nvarchar',
		comment: 'Image of question',
		unique: false,
		length: 1000,
		nullable: true
	})
	image: string;

	@Column({
		name: 'isAnonymous',
		type: 'boolean',
		comment: 'isAnonymous',
		nullable: true,
		default: true
	})
	isAnonymous: boolean;

	@ManyToOne(() => UserAccountEntity, user => user.question)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_question_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	createdBy: UserAccountEntity;

	@ManyToOne(() => SpecialityEntity, speciality => speciality.questions)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_question_speciality',
		name: 'speciality_id',
		referencedColumnName: 'specialityId'
	})
	speciality: SpecialityEntity;

	@ManyToOne(() => LanguageEntity, language => language.questions)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_question_language',
		name: 'language_id',
		referencedColumnName: 'languageId'
	})
	language: LanguageEntity;

	@Column({
		name: 'created_at',
		type: 'datetime',
		comment: 'Date and time when the question is published.',
		unique: false,
		nullable: false,
		default: () => 'NOW()'
	})
	createdAt: Date;
}
