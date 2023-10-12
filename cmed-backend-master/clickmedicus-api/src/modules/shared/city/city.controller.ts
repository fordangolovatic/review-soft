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

import { CityServiceInterface } from './interfaces/city.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { CityResponse } from './dto/city.response.dto';
import { CitiesResponse } from './dto/cities.response.dto';

/**
 * An API for city table.
 */
@ApiTags('City')
@Controller('city')
export class CityController extends BaseController {
	constructor(
		@Inject(DIToken.CITY_SERVICE_INTERFACE)
		private readonly cityService: CityServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of city.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns a single record of account.' },
		apiResponseData: { status: 200, type: CitiesResponse, isArray: true },
		apiSecurityData: 'accessToken'
	})
	@Get()
	@Permissions(`CITY:${PermissionEnum.VIEW}`)
	public async get(): Promise<CityEntity[]> {
		return await this.cityService.getAll();
	}

	/**
	 * Returns a single record of city based on the given city id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns a single record of account.' },
		apiResponseData: { status: 200, type: CityResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`CITY:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<CityEntity> {
		return await this.cityService.getOneById(id);
	}

	/**
	 * Returns a list of cities based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns a single record of account.' },
		apiResponseData: { status: 200, type: CitiesResponse },
		apiSecurityData: 'accessToken'
	})
	@Get('getByState/:stateId')
	@Permissions(`CITY:${PermissionEnum.VIEW}`)
	public async getByState(
		@Param('stateId', ParseIntPipe) stateId: number
	): Promise<CityEntity[]> {
		return await this.cityService.getManyByCondition({
			where: {
				stateId: stateId
			}
		});
	}

	/**
	 * Returns a list of cities based on the given state id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Returns a single record of account.' },
		apiResponseData: { status: 200, type: CitiesResponse },
		apiSecurityData: 'accessToken'
	})
	@Get('getByCountry/:countryId')
	@Permissions(`CITY:${PermissionEnum.VIEW}`)
	public async getByCountry(
		@Param('countryId', ParseIntPipe) countryId: number
	): Promise<CityEntity[]> {
		return await this.cityService.getManyByCondition({
			where: {
				countryId: countryId
			}
		});
	}

	/**
	 * Create new city.
	 * @param {CreateCityDto} data - Data which need to be inserted in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new city.' },
		apiResponseData: { status: 201, type: Number },
		apiSecurityData: 'accessToken'
	})
	@Post()
	@Permissions(`CITY:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateCityDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.cityService.create(data)).cityId;
	}

	/**
	 * Update an existing city
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCityDto} data - Data which need to be updated in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing city' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`CITY:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateCityDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (await this.cityService.update(data.cityId, data)).affected > 0;
	}

	/**
	 * Delete city based on the given city id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete city based on the given city id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`CITY:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.cityService.delete(id)).affected > 0;
	}
}
