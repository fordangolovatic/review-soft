import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '@base/repositories/base.repository';
import { StateRepositoryInterface } from '../interfaces/state.repository.interface';
import { StateEntity } from '../entities/state.entity';

/**
 * A repository for state table.
 */
@Injectable()
export class StateRepository
	extends BaseAbstractRepository<StateEntity>
	implements StateRepositoryInterface
{
	constructor(
		@InjectRepository(StateEntity)
		private readonly stateRepository: Repository<StateEntity>
	) {
		super(stateRepository);
	}
}
