import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { CityEntity } from '../entities/city.entity';

/**
 * A contract for [CityRepository]{@link CityRepository} class.
 */
export type CityRepositoryInterface = BaseRepositoryInterface<CityEntity>;
