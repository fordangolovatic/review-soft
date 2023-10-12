import { BaseRepositoryInterface } from '@base/interfaces/base.repository.interface';
import { PostEntity } from '../entities/post.entity';
import { PostRepository } from '../repositories/post.repository';

/**
 * A contract for [PostRepository]{@link PostRepository} class.
 */
export type PostRepositoryInterface = BaseRepositoryInterface<PostEntity>;
