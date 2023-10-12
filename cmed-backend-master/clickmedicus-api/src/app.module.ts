import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { UserAccountModule } from '@modules/user/user-account/user-account.module';
import configuration from '@config/envs/configuration';
import { GenericExceptionFilter } from '@core/filters/generic.filter';
import { I18nValidationExceptionFilter } from '@core/filters/i18n-validation.filter';
import { PermissionGuard } from '@core/guards/auth/permission.guard';
import { JwtAuthGuard } from '@core/guards/passport/jwt-auth.guard';
import { FeatureGroupModule } from '@modules/feature-group/feature-group.module';
import { FeatureModule } from '@modules/feature/feature.module';
import { CityModule } from '@modules/shared/city/city.module';
import { CountryModule } from '@modules/shared/country/country.module';
import { CurrencyModule } from '@modules/shared/currency/currency.module';
import { LanguageModule } from '@modules/shared/language/language.module';
import { StateModule } from '@modules/shared/state/state.module';
import { RoleFeatureModule } from '@modules/user/role-feature/role-feature.module';
import { RoleModule } from '@modules/user/role/role.module';
import { UserSessionModule } from '@modules/user/user-session/user-session.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { PostModule } from '@modules/social-media/media/post.module';
import { RolesGuard } from '@core/guards/roles/roles.guard';
import { ArticleModule } from '@modules/articles/article.module';
import { NotificationsModule } from '@modules/notifications/notification.module';
import { SpecialitiesModule } from '@modules/specialities/specialities.module';
import { MessageModule } from '@modules/messages/message.module';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { DIToken } from '@core/enums/ditoken.enum';
import { MetadataModule } from '@modules/metadata/metadata.module';
import { DoctorModule } from '@modules/doctor/doctor.module';
import { ResidentModule } from '@modules/resident/resident.module';
import { QuestionsModule } from '@modules/questions/questions.module';
import { ConsultationsModule } from '@modules/consultation/consultations.module';
import { FavoriteDoctorsModule } from '@modules/favorite-doctor/favorite-doctors.module';
import { FavoriteArticlesModule } from '@modules/favorite-article/favorite-article.module';
import { LikeModule } from '@modules/like/like.module';
import { CommentsModule } from '@modules/comment/comments.module';
import { NodemailerModule } from '@modules/nodemailer/nodemailer.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !process.env.NODE_ENV
				? '.env'
				: `.env.${process.env.NODE_ENV}`,
			load: [configuration]
		}),
		I18nModule.forRoot({
			fallbackLanguage: 'en',
			loaderOptions: {
				path: path.join(__dirname, '/i18n/'),
				watch: true
			},
			resolvers: [
				{
					use: QueryResolver,
					options: ['lang']
				},
				AcceptLanguageResolver
			],
			typesOutputPath: path.join(
				__dirname,
				'../src/generated/i18n.generated.ts'
			)
		}),
		TypeOrmModule.forRootAsync({
			name: 'default',
			useFactory: (configService: ConfigService) => {
				return {
					...configService.get('database.mysql')
				};
			},
			inject: [ConfigService]
		}),
		ServeStaticModule.forRoot({
			rootPath: `${__dirname}/../public`,
			renderPath: '/'
		}),
		RedisModule.forRootAsync({
			useFactory: (configService: ConfigService) => {
				return {
					closeClient: true,
					config: {
						...configService.get('database.redis')
					}
				};
			},
			inject: [ConfigService]
		}),
		NodemailerModule,
		NotificationsModule,
		AuthModule,
		RoleModule,
		FeatureModule,
		FeatureGroupModule,
		RoleFeatureModule,
		UserAccountModule,
		UserSessionModule,
		CountryModule,
		StateModule,
		CityModule,
		CurrencyModule,
		LanguageModule,
		PostModule,
		ArticleModule,
		ConsultationsModule,
		SpecialitiesModule,
		MetadataModule,
		MessageModule,
		DoctorModule,
		ResidentModule,
		QuestionsModule,
		FavoriteDoctorsModule,
		FavoriteArticlesModule,
		LikeModule,
		CommentsModule
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_FILTER,
			useClass: GenericExceptionFilter
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},
		{
			provide: APP_GUARD,
			useClass: PermissionGuard
		},
		{
			provide: APP_FILTER,
			useClass: I18nValidationExceptionFilter
		},
		{
			provide: DIToken.USER_ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		AppService
	]
})
export class AppModule {}
