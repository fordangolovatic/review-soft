import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CurrencyEntity } from '../entities/currency.entity';

/**
 * A contract for [CurrencyRepository]{@link CurrencyRepository} class.
 */
export type CurrencyRepositoryInterface =
	BaseRepositoryInterface<CurrencyEntity>;
