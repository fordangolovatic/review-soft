import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { LanguageRepositoryInterface } from '../interfaces/language.repository.interface';
import { LanguageEntity } from '../entities/language.entity';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

/**
 * A repository for language table.
 */
@Injectable()
export class LanguageRepository
	extends BaseAbstractRepository<LanguageEntity>
	implements LanguageRepositoryInterface
{
	constructor(
		@InjectRepository(LanguageEntity)
		private readonly languageRepository: Repository<LanguageEntity>,
		@InjectRepository(UserAccountEntity)
		private readonly userAccountRepository: Repository<UserAccountEntity>
	) {
		super(languageRepository);
	}

	async createEntity(
		data: CreateLanguageDto,
		userAccountEntity: UserAccountEntity
	) {
		const language = this.languageRepository.create(data);

		const account = await this.userAccountRepository.findOne({
			where: { userId: userAccountEntity.userId }
		});

		language.accounts = [];

		language.accounts.push(account);

		return this.languageRepository.save(language);
	}
}
