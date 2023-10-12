import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put
} from '@nestjs/common';

import { DIToken } from '@core/enums/ditoken.enum';

import { StateServiceInterface } from './interfaces/state.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateEntity } from './entities/state.entity';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { StatesResponse } from './dto/states.response.dto';
import { StateResponse } from './dto/state.response.dto';

/**
 * An API for state table.
 */
@ApiTags('State')
@Controller('state')
export class StateController extends BaseController {
	constructor(
		@Inject(DIToken.STATE_SERVICE_INTERFACE)
		private readonly stateService: StateServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of state.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns a single record of account.' },
		apiResponseData: { status: 200, type: StatesResponse, isArray: true },
		apiSecurityData: 'accessToken'
	})
	@Get()
	@Permissions(`STATE:${PermissionEnum.VIEW}`)
	public async get(): Promise<StateEntity[]> {
		return await this.stateService.getAll();
	}

	/**
	 * Returns a single record of state based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns a single record of account.' },
		apiResponseData: { status: 200, type: StateResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`STATE:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<StateEntity> {
		return await this.stateService.getOneById(id);
	}

	/**
	 * Create new state.
	 * @param {CreateStateDto} data - Data which need to be inserted in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new state.' },
		apiSecurityData: 'accessToken'
	})
	@Post()
	@Permissions(`STATE:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateStateDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.stateService.create(data)).stateId;
	}

	/**
	 * Update an existing state
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateStateDto} data - Data which need to be updated in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing state.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`STATE:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateStateDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.stateService.update(data.stateId, data)).affected > 0
		);
	}

	/**
	 * Delete state based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete state based on the given state id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`STATE:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.stateService.delete(id)).affected > 0;
	}
}
