import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseInterceptors
} from '@nestjs/common';

import { DIToken } from '@core/enums/ditoken.enum';

import { RoleFeatureServiceInterface } from './interfaces/role-feature.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { RoleFeatureDto } from './dto/role-feature.dto';
import { RoleFeatureEntity } from './entities/role-feature.entity';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { RolesFeatureReponse } from './dto/roles-feature.response.dto';
import { RoleFeatureReponse } from './dto/role-feature.response.dto';

/**
 * An API for role_feature table.
 */
@ApiTags('Role-feature')
@ApiExcludeController()
@Controller('role_feature')
export class RoleFeatureController extends BaseController {
	constructor(
		@Inject(DIToken.ROLE_FEATURE_SERVICE_INTERFACE)
		private roleFeatureService: RoleFeatureServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of role feature.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: {
			status: 200,
			type: RolesFeatureReponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@UseInterceptors(ClassSerializerInterceptor)
	@Get()
	public async get(): Promise<RoleFeatureEntity[]> {
		return await this.roleFeatureService.getAll();
	}

	/**
	 * Returns a single record of role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: { status: 200, type: RoleFeatureReponse },
		apiSecurityData: 'accessToken'
	})
	@UseInterceptors(ClassSerializerInterceptor)
	@Get(':id')
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<RoleFeatureEntity> {
		return await this.roleFeatureService.getOneById(id);
	}

	/**
	 * Create new role feature.
	 * @param {RoleFeatureDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new role feature.' },
		apiSecurityData: 'accessToken'
	})
	@Post()
	public async create(@Body() data: RoleFeatureDto): Promise<number> {
		return (await this.roleFeatureService.create(data)).roleFeatureId;
	}

	/**
	 * Update an existing role feature.
	 * @param {RoleFeatureDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing role feature.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	public async update(@Body() data: RoleFeatureDto): Promise<boolean> {
		return (
			(await this.roleFeatureService.update(data.roleFeatureId, data))
				.affected > 0
		);
	}

	/**
	 * Delete role feature based on the given role feature id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete role feature based on the given role feature id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.roleFeatureService.delete(id)).affected > 0;
	}
}
