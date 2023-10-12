import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { RoleEntity } from '../entities/role.entity';
import { RoleRepository } from '../repositories/role.repository';

/**
 * A contract for [RoleRepository]{@link RoleRepository} class.
 */
export type RoleRepositoryInterface = BaseRepositoryInterface<RoleEntity>;
