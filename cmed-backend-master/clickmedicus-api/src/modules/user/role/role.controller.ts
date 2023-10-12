import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseBoolPipe,
	ParseIntPipe,
	Post,
	Put
} from '@nestjs/common';

import { DIToken } from '@core/enums/ditoken.enum';

import { RoleServiceInterface } from './interfaces/role.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '../user-account/entities/user-account.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { RolesResponse } from './dto/roles.response.dto';
import { RoleResponse } from './dto/role.response.dto';

/**
 * An API for role master.
 */
@ApiTags('Role')
@Controller('role')
@ApiExcludeController()
export class RoleController extends BaseController {
	constructor(
		@Inject(DIToken.ROLE_SERVICE_INTERFACE)
		private roleService: RoleServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of role.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns a list of all the records of role.'
		},
		apiResponseData: { status: 200, type: RolesResponse },
		apiSecurityData: 'accessToken'
	})
	@Get()
	@Permissions(`ROLE:${PermissionEnum.VIEW}`)
	public async get(): Promise<RoleEntity[]> {
		return await this.roleService.getAll();
	}

	/**
	 * Returns a list of role based on the flag.
	 * @param {boolean} isForSignup - a flag to get roles for signup.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns a list of role based on the flag.'
		},
		apiResponseData: { status: 200, type: RolesResponse, isArray: true },
		apiSecurityData: 'accessToken'
	})
	@Get('getRolesForSignup/:isForSignup')
	@Permissions(`ROLE:${PermissionEnum.VIEW}`)
	public async getRolesForSignup(
		@Param('isForSignup', ParseBoolPipe) isForSignup: boolean
	): Promise<RoleEntity[]> {
		return await this.roleService.getManyByCondition({
			where: {
				isForSignup: isForSignup
			}
		});
	}

	/**
	 * Returns a single record of role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of user based on the given user id.'
		},
		apiResponseData: { status: 200, type: RoleResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`ROLE:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<RoleEntity> {
		return await this.roleService.getOneById(id);
	}

	/**
	 * Create new role.
	 * @param {CreateRoleDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new role.' },
		apiResponseData: { status: 201 },
		apiSecurityData: 'accessToken'
	})
	@Post()
	@Permissions(`ROLE:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateRoleDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.roleService.create(data)).roleId;
	}

	/**
	 * Update an existing role.
	 * @param {UpdateRoleDto} data - Data which need to be stored in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing role.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`ROLE:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateRoleDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (await this.roleService.update(data.roleId, data)).affected > 0;
	}

	/**
	 * Delete role based on the given role id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete role based on the given role id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`ROLE:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.roleService.delete(id)).affected > 0;
	}
}
