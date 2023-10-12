import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { StateEntity } from '../entities/state.entity';

/**
 * A contract for [StateRepository]{@link StateRepository} class.
 */
export type StateRepositoryInterface = BaseRepositoryInterface<StateEntity>;
