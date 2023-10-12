import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateLanguageDto } from '../dto/create-language.dto';
import { LanguageEntity } from '../entities/language.entity';

/**
 * A contract for [LanguageRepository]{@link LanguageRepository} class.
 */
// export type LanguageRepositoryInterface =
// 	BaseRepositoryInterface<LanguageEntity>;

export interface LanguageRepositoryInterface
	extends BaseRepositoryInterface<LanguageEntity> {
	createEntity(data: CreateLanguageDto, userAccountEntity: UserAccountEntity);
}
