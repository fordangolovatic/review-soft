import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StateService } from './state.service';
import { StateController } from './state.controller';

import { DIToken } from '@core/enums/ditoken.enum';
import { StateRepository } from './repositories/state.repository';

import { StateEntity } from './entities/state.entity';

/**
 * A module class for state module.
 */
@Module({
	imports: [TypeOrmModule.forFeature([StateEntity])],
	providers: [
		{
			provide: DIToken.STATE_REPOSITORY_INTERFACE,
			useClass: StateRepository
		},
		{
			provide: DIToken.STATE_SERVICE_INTERFACE,
			useClass: StateService
		}
	],
	controllers: [StateController],
	exports: [
		TypeOrmModule,
		{
			provide: DIToken.STATE_REPOSITORY_INTERFACE,
			useClass: StateRepository
		},
		{
			provide: DIToken.STATE_SERVICE_INTERFACE,
			useClass: StateService
		}
	]
})
export class StateModule {}
