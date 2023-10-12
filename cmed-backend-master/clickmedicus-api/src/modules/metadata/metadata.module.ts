import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { UserAccountModule } from '@modules/user/user-account/user-account.module';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UserAccountRepository } from '@modules/user/user-account/repositories/user-account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { ArticleEntity } from '@modules/articles/entities/article.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserAccountEntity, ArticleEntity]),
		UserAccountModule
	],
	controllers: [MetadataController],
	providers: [
		{
			provide: DIToken.ACCOUNT_REPOSITORY_INTERFACE,
			useClass: UserAccountRepository
		},
		MetadataService
	]
})
export class MetadataModule {}
