import { ArticleEntity } from '@modules/articles/entities/article.entity';
import { MessageEntity } from '@modules/messages/entities/message.entity';
import { CountryEntity } from '@modules/shared/country/entities/country.entity';
import { StateEntity } from '@modules/shared/state/entities/state.entity';
import { PostEntity } from '@modules/social-media/media/entities/post.entity';
import { SpecialityEntity } from '@modules/specialities/entities/speciality.entity';
import { MedicalRecordEntity } from '@modules/user/user-account/entities/medical-record.entity';
import { genSalt, hash } from 'bcrypt';
import {
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne
} from 'typeorm';
import { AccountAvailabilityEntity } from '../../../user/account-availability/entities/account-availability.entity';
import { AccountDocumentEntity } from '../../account-document/entities/account-document.entity';
import { AccountWalletEntity } from '../../wallet/account-wallet/entities/account-wallet.entity';
import { AccountConsultationPriceEntity } from '../account-consultation-price/entities/account-consultation-price.entity';
import { AccountType } from '@core/constants/enums/accountType.enum';
import { CommentEntity } from '@modules/comment/entities/comment.entity';
import { ConsultationSessionEntity } from '@modules/consultation/consultation-session/entities/consultation-session.entity';
import { RatingItem } from '@modules/doctor/dto/doctor.dto';
import { FavoriteArticleEntity } from '@modules/favorite-article/entities/favorite-article.entity';
import { FavoriteDoctorEntity } from '@modules/favorite-doctor/entities/favorite-doctor.entity';
import { LikeEntity } from '@modules/like/entities/like.entity';
import { NotificationEntity } from '@modules/notifications/entities/notification.entity';
import { QuestionEntity } from '@modules/questions/entities/question.entity';
import { ForumCommentEntity } from '../../../forum/forum-comment/entities/forum-comment.entity';
import { ForumEntity } from '../../../forum/forum/entities/forum.entity';
import { PatientAnamnesisEntity } from '../../../patient/patient-anamnesis/entities/patient-anamnesis.entity';
import { CityEntity } from '../../../shared/city/entities/city.entity';
import { LanguageEntity } from '../../../shared/language/entities/language.entity';
import { ActivityProgramEntity } from './activity-program.entity';
import { ProfessionalInfoEntity } from './professional-info.entity';
/**
 * An entity class for user table in the database.
 */
@Entity('user')
export class UserAccountEntity {
	/**
	 * PK of the table.
	 */
	@Column({
		name: 'user_id',
		type: 'int',
		comment: 'PK of the table.',
		generated: 'increment',
		primary: true,
		nullable: false,
		unique: true
	})
	userId: number;
	/**
	 * First name of the user.
	 */
	@Column({
		name: 'firstname',
		type: 'varchar',
		length: 100,
		comment: 'First name of the user.',
		nullable: false
	})
	firstName: string;
	/**
	 * Last name of the user.
	 */
	@Column({
		name: 'lastname',
		type: 'varchar',
		length: 100,
		comment: 'Last name of the user.',
		nullable: false
	})
	lastName: string;
	/**
	 * Username of the user.
	 */
	@Column({
		name: 'username',
		type: 'varchar',
		length: 200,
		comment: 'Username of the user.',
		nullable: false,
		unique: true
	})
	username: string;
	/**
	 * Email address of the user.
	 */
	@Column({
		name: 'email',
		type: 'varchar',
		length: 200,
		comment: 'Email address of the user.',
		nullable: false,
		unique: true
	})
	email: string;
	/**
	 * Password to login into the system.
	 */
	@Column({
		name: 'password',
		type: 'varbinary',
		length: 128,
		comment: 'Password to login into the system.',
		nullable: false
	})
	@Column({ select: false })
	password: string;
	/**
	 * Account type
	 */
	@Column({
		name: 'accountType',
		type: 'varchar',
		comment: 'user account type ',
		nullable: false
	})
	accountType: AccountType;

	/**
	 * Gender. M = Male, F = Female, O = Other
	 */
	@Column({
		name: 'gender',
		type: 'char',
		comment: 'Gender. M = Male, F = Female, O = Other',
		unique: false,
		length: 1,
		nullable: true
	})
	gender: string;

	/**
	 * Address of the user.
	 */
	@Column({
		name: 'address',
		type: 'nvarchar',
		comment: 'Address of the user.',
		unique: false,
		length: 500,
		nullable: true
	})
	address: string;

	/**
	 * Is active user.
	 */
	@Column({
		name: 'isactive',
		type: 'tinyint',
		comment: 'Is active user.',
		nullable: false
	})
	isActive: number;
	/**
	 * Is admin user.
	 */
	@Column({
		name: 'isAdmin',
		type: 'boolean',
		comment: 'Is default role or not.',
		nullable: true,
		default: false
	})
	isAdmin: boolean;

	/**
	 * Date of birth to calculate the age.
	 */
	@Column({
		name: 'date_of_birth',
		type: 'date',
		comment: 'Date of birth to calculate the age.',
		unique: false,
		nullable: true
	})
	dateOfBirth: string;

	/**
	 * Profile image path.
	 */
	@Column({
		name: 'profileimage',
		type: 'varchar',
		length: 500,
		comment: 'Profile image path.',
		nullable: true
	})
	profileImage: string;
	/**
	 * User id of a user who created the record.
	 */
	@Column({
		name: 'createdby',
		type: 'int',
		comment: 'User id of a user who created the record.',
		nullable: false
	})
	createdBy: number;
	/**
	 * Date and time when the record is created.
	 */
	@Column({
		name: 'createddate',
		type: 'datetime',
		comment: 'Date and time when the record is created.',
		nullable: false
	})
	createdDate: Date;
	@Column({
		name: 'description',
		type: 'nvarchar',
		comment: 'Description ',
		unique: false,
		nullable: true
	})
	description: string;
	/**
	 * FK to city table.
	 */
	@Column({
		name: 'city_id',
		type: 'int',
		comment: 'FK to city table.',
		unique: false,
		nullable: true
	})
	cityId: number;
	/**
	 * FK to country table.
	 */
	@Column({
		name: 'country_id',
		type: 'int',
		comment: 'FK to country table.',
		unique: false,
		nullable: true
	})
	countryId: number;
	/**
	 * FK to country table.
	 */
	@Column({
		name: 'state_id',
		type: 'int',
		comment: 'FK to state table.',
		unique: false,
		nullable: true
	})
	stateId: number;

	/**
	 * Postal code.
	 */
	@Column({
		name: 'postal_code',
		type: 'nvarchar',
		comment: 'Postal code.',
		unique: false,
		length: 10,
		nullable: true
	})
	postalCode: string;

	/**
	 * This will be used only for assistant doctor. It will be doctor's id who have added the assistant doctor.
	 */
	@Column({
		name: 'parent_account_id',
		type: 'bigint',
		comment:
			"This will be used only for assistant doctor. It will be doctor's id who have added the assistant doctor.",
		unique: false,
		nullable: true
	})
	parentAccountId: number;

	/**
	 * Is the user is translator or not?
	 */
	@Column({
		name: 'is_translator',
		type: 'boolean',
		comment: 'Is the user is translator or not?',
		unique: false,
		nullable: true
	})
	isTranslator: boolean;

	/**
	 * The identity of the doctor is verified / not by the portal.
	 */
	@Column({
		name: 'is_verified',
		type: 'boolean',
		comment: 'The identity of the doctor is verified / not by the portal.',
		unique: false,
		nullable: true
	})
	isVerified: boolean;

	/**
	 * Whether the doctor has accepted the terms and conditions of the portal.
	 */
	@Column({
		name: 'terms_and_condition_accepted',
		type: 'boolean',
		comment:
			'Whether the doctor has accepted the terms and conditions of the portal.',
		unique: false,
		nullable: true
	})
	termsAndConditionAccepted: boolean;
	/**
	 * User id of a user who modified the record.
	 */
	@Column({
		name: 'modifiedby',
		type: 'int',
		comment: 'User id of a user who modified the record.',
		nullable: true
	})
	modifiedBy: number;
	/**
	 * Date and time when the record is modified.
	 */
	@Column({
		name: 'modifieddate',
		type: 'datetime',
		comment: 'Date and time when the record is modified.',
		nullable: true
	})
	modifiedDate: Date;
	/**
	 * Is generated by the system.
	 */
	@Column({
		name: 'issystem',
		type: 'tinyint',
		comment: 'Is generated by the system.',
		nullable: false
	})
	isSystem: number;
	/**
	 * Is confirmed / varified user (email verification).
	 */
	@Column({
		name: 'isconfirmed',
		type: 'tinyint',
		comment: 'Is confirmed / varified user (email verification).',
		nullable: false
	})
	isConfirmed: number;

	// @ManyToMany(() => RoleEntity, role => role.users, { cascade: true })
	// @JoinTable({
	//   Name: 'user_role',
	//   JoinColumn: {
	//     Name: 'user_id',
	//     ReferencedColumnName: 'userId'
	//   },
	//   InverseJoinColumn: {
	//     Name: 'role_id',
	//     ReferencedColumnName: 'roleId'
	//   }
	// })
	// roles: RoleEntity[];

	/**
	 * Reference with foreign key table - forum to create One-to-Many relationship constraint FK_forum_user.
	 */
	@OneToMany(() => ForumEntity, forum => forum.user)
	forums: ForumEntity[];
	/**
	 * Reference with foreign key table - forum_comment to create One-to-Many relationship constraint FK_forum_comment_user.
	 */
	@OneToMany(() => ForumCommentEntity, forumComment => forumComment.user)
	forumComments: ForumCommentEntity[];
	@OneToMany(() => SpecialityEntity, speciality => speciality.createdBy)
	specialities: SpecialityEntity[];
	@OneToMany(() => ArticleEntity, article => article.createdBy)
	article: ArticleEntity[];
	@OneToMany(() => PostEntity, post => post.user)
	post: PostEntity[];
	@OneToOne(
		() => ProfessionalInfoEntity,
		professionalInfo => professionalInfo.user
	)
	professionalInfo: ProfessionalInfoEntity;
	@OneToOne(() => MedicalRecordEntity, medicalRecord => medicalRecord.user)
	medicalRecord: MedicalRecordEntity;
	@OneToMany(() => QuestionEntity, question => question.createdBy)
	question: QuestionEntity;
	@OneToMany(() => MessageEntity, message => message.to)
	message_to: MessageEntity[];
	@OneToMany(() => MessageEntity, message => message.from)
	message_from: MessageEntity[];
	@OneToMany(() => NotificationEntity, notification => notification.createdBy)
	notification: NotificationEntity[];
	@OneToMany(() => NotificationEntity, notification => notification.user)
	user: NotificationEntity[];
	@OneToMany(
		() => ActivityProgramEntity,
		activityProgram => activityProgram.account
	)
	activityProgram: ActivityProgramEntity[];
	@OneToMany(
		() => FavoriteDoctorEntity,
		favoriteDoctor => favoriteDoctor.createdBy
	)
	doctor: FavoriteDoctorEntity[];
	@OneToMany(
		() => FavoriteDoctorEntity,
		favoriteDoctor => favoriteDoctor.doctor
	)
	favoriteDoctor: FavoriteDoctorEntity[];
	@OneToMany(
		() => FavoriteArticleEntity,
		favoriteArticle => favoriteArticle.createdBy
	)
	favoriteArticle: FavoriteArticleEntity[];
	@OneToMany(() => LikeEntity, like => like.userId)
	like: LikeEntity[];
	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity[];
	@OneToMany(
		() => ConsultationSessionEntity,
		consultation => consultation.patient
	)
	ConsultationPatient: ConsultationSessionEntity[];
	/**
	 * Reference with foreign key table - account_wallet to create One-to-One relationship constraint FK_account_wallet_account.
	 */
	@OneToOne(() => AccountWalletEntity, accountWallet => accountWallet.account)
	accountWallet: AccountWalletEntity;
	@OneToMany(
		() => ConsultationSessionEntity,
		consultation => consultation.doctor
	)
	ConsultationDoctor: ConsultationSessionEntity[];
	@OneToMany(
		() => ConsultationSessionEntity,
		consultation => consultation.cancelledBy
	)
	ConsultationCancelled: ConsultationSessionEntity[];
	@BeforeInsert()
	async hashPassword() {
		if (this.password) {
			this.password = await hash(this.password, await genSalt(10));
		}
	}
	/**
	 * Reference with primary key table - city to create Many-to-One relationship constraint FK_account_city.
	 */
	@ManyToOne(() => CityEntity, city => city.accounts)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_city',
		name: 'city_id',
		referencedColumnName: 'cityId'
	})
	city: CityEntity;
	/**
	 * Reference with foreign key table - account_language to create Many-to-Many relationship constraint FK_account_language_account.
	 */
	@ManyToMany(() => LanguageEntity, language => language.accounts)
	@JoinTable({
		inverseJoinColumn: {
			foreignKeyConstraintName: 'FK_account_language_language',
			name: 'language_id',
			referencedColumnName: 'languageId'
		},
		joinColumn: {
			foreignKeyConstraintName: 'FK_account_language_account',
			name: 'user_id',
			referencedColumnName: 'userId'
		},
		name: 'account_language'
	})
	languages: LanguageEntity[];

	@Column({ nullable: true }) 
	passwordResetToken: string;

	@Column({ nullable: true }) 
	passwordResetTokenExpires: Date;
	/**
	 * Reference with foreign key table - account_availability to create One-to-Many relationship constraint FK_account_availability_account.
	 */
	@OneToMany(
		() => AccountAvailabilityEntity,
		accountAvailability => accountAvailability.account
	)
	accountAvailability: AccountAvailabilityEntity[];
	/**
	 * Reference with foreign key table - account_consultation_price to create One-to-Many relationship constraint FK_account_consultation_price_account.
	 */
	@OneToMany(
		() => AccountConsultationPriceEntity,
		accountConsultationPrice => accountConsultationPrice.account
	)
	accountConsultationPrices: AccountConsultationPriceEntity[];

	/**
	 * Reference with foreign key table - patient_favorite_doctor to create One-to-Many relationship constraint FK_patient_favorite_doctor_account.
	 */
	@ManyToMany(() => UserAccountEntity, user => user.patientFavoriteDoctors)
	@JoinTable({
		inverseJoinColumn: {
			foreignKeyConstraintName: 'FK_patient_favorite_doctor_account',
			name: 'patient_id',
			referencedColumnName: 'userId'
		},
		joinColumn: {
			foreignKeyConstraintName: 'FK_patient_favorite_doctor_account1',
			name: 'doctor_id',
			referencedColumnName: 'userId'
		},
		name: 'patient_favorite_doctor'
	})
	doctorFavoriteDoctors: UserAccountEntity[];

	/**
	 * Reference with foreign key table - patient_favorite_doctor to create One-to-Many relationship constraint FK_patient_favorite_doctor_account1.
	 */
	@ManyToMany(() => UserAccountEntity, user => user.doctorFavoriteDoctors)
	patientFavoriteDoctors: UserAccountEntity[];

	/**
	 * Reference with foreign key table - account_document to create One-to-Many relationship constraint FK_account_document_account.
	 */
	@OneToMany(
		() => AccountDocumentEntity,
		accountDocument => accountDocument.account
	)
	accountDocuments: AccountDocumentEntity[];
	/**
	 * Reference with foreign key table - patient_anamnesis to create One-to-One relationship constraint FK_patient_anamnesis_account.
	 */
	@OneToOne(
		() => PatientAnamnesisEntity,
		patientAnamnesis => patientAnamnesis.account
	)
	patientAnamnesis: PatientAnamnesisEntity;
	/**
	 * Reference with foreign key table - consultation_session to create One-to-Many relationship constraint FK_consultation_session_account2.
	 */
	@OneToMany(
		() => ConsultationSessionEntity,
		consultationSession => consultationSession.translator
	)
	translatorConsultationSessions: ConsultationSessionEntity[];
	/**
	 * Reference with foreign key table - consultation_session to create One-to-Many relationship constraint FK_consultation_session_account1.
	 */
	@OneToMany(
		() => ConsultationSessionEntity,
		consultationSession => consultationSession.doctor
	)
	doctorConsultationSessions: ConsultationSessionEntity[];
	/**
	 * Reference with foreign key table - consultation_session to create One-to-Many relationship constraint FK_consultation_session_account.
	 */
	@OneToMany(
		() => ConsultationSessionEntity,
		consultationSession => consultationSession.patient
	)
	patientConsultationSessions: ConsultationSessionEntity[];
	@ManyToOne(() => StateEntity, state => state.accounts)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_state',
		name: 'state_id',
		referencedColumnName: 'stateId'
	})
	state: StateEntity;
	/**
	 * Reference with primary key table - city to create Many-to-One relationship constraint FK_account_city.
	 */
	@ManyToOne(() => CountryEntity, country => country.accounts)
	@JoinColumn({
		foreignKeyConstraintName: 'FK_account_country',
		name: 'country_id',
		referencedColumnName: 'countryId'
	})
	country: CountryEntity;

	rating?: RatingItem;
}
