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
import { FeatureGroupServiceInterface } from './interfaces/feature-group.service.interface';
import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateFeatureGroupDto } from './dto/create-feature-group.dto';
import { UpdateFeatureGroupDto } from './dto/update-feature-group.dto';
import { FeatureGroupEntity } from './entities/feature-group.entity';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { FeatureGroupsResponse } from './dto/feature-groups.response.dto';
import { FeatureGroupResponse } from './dto/feature-group.response.dto';

/**
 * An API for featureGroup master.
 */
@ApiTags('FeatureGroup')
@Controller('featureGroup')
@ApiExcludeController()
export class FeatureGroupController extends BaseController {
	constructor(
		@Inject(DIToken.FEATURE_GROUP_SERVICE_INTERFACE)
		private featureGroupService: FeatureGroupServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of featureGroup.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: {
			status: 200,
			type: FeatureGroupsResponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@Get()
	@Permissions(`FTRGRP:${PermissionEnum.VIEW}`)
	public async get(): Promise<FeatureGroupEntity[]> {
		return await this.featureGroupService.getAll();
	}

	/**
	 * Returns a single record of featureGroup based on the given featureGroup id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: { status: 200, type: FeatureGroupResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`FTRGRP:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<FeatureGroupEntity> {
		return await this.featureGroupService.getOneById(id);
	}

	/**
	 * Create new featureGroup.
	 * @param {CreateFeatureGroupDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new featureGroup.' },
		apiSecurityData: 'accessToken'
	})
	@Post()
	//@Permissions(`FTRGRP:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateFeatureGroupDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.featureGroupService.create(data)).featureGroupId;
	}

	/**
	 * Update an existing featureGroup.
	 * @param {UpdateFeatureGroupDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing featureGroup.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`FTRGRP:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateFeatureGroupDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.featureGroupService.update(data.featureGroupId, data))
				.affected > 0
		);
	}

	/**
	 * Delete featureGroup based on the given featureGroup id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete featureGroup based on the given featureGroup id'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`FTRGRP:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.featureGroupService.delete(id)).affected > 0;
	}
}
