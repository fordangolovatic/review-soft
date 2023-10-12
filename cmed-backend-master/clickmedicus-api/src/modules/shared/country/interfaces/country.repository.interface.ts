import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CountryEntity } from '../entities/country.entity';

/**
 * A contract for [CountryRepository]{@link CountryRepository} class.
 */
export type CountryRepositoryInterface = BaseRepositoryInterface<CountryEntity>;
