import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToMany
} from 'typeorm';
import { ProfessionalInfoEntity } from '@modules/user/user-account/entities/professional-info.entity';
import { QuestionEntity } from '@modules/questions/entities/question.entity';
import { ArticleEntity } from '@modules/articles/entities/article.entity';

@Entity('speciality')
export class SpecialityEntity {
	@Column({
		name: 'speciality_id',
		type: 'bigint',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		unique: true,
		nullable: false
	})
	specialityId: number;

	@Column({
		name: 'speciality_name',
		type: 'nvarchar',
		comment: 'Speciality name.',
		unique: false,
		length: 1000,
		nullable: true
	})
	specialityName: string;

	@Column({
		name: 'speciality_image',
		type: 'varchar',
		length: 500,
		comment: 'Speciality image path.',
		nullable: true
	})
	image: string;

	/**
	 * Date and time when the record is created.
	 */
	@Column({
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		unique: false,
		nullable: false,
		default: () => 'NOW()'
	})
	createdAt: Date;

	@ManyToOne(() => UserAccountEntity, user => user.specialities)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_specialities_user',
		name: 'user_id',
		referencedColumnName: 'userId'
	})
	createdBy: UserAccountEntity;

	@ManyToMany(() => ArticleEntity, { nullable: true })
	article: ArticleEntity[];

	@OneToMany(() => QuestionEntity, question => question.speciality)
	questions: QuestionEntity[];

	@ManyToOne(
		() => ProfessionalInfoEntity,
		professionalInfo => professionalInfo.specialities
	)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_professional-info_specialities',
		name: 'professional_info_id',
		referencedColumnName: 'professionalInfoId'
	})
	professionalInfo: ProfessionalInfoEntity;
}
