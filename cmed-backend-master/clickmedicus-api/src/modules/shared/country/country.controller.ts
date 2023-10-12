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

import { CountryServiceInterface } from './interfaces/country.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryEntity } from './entities/country.entity';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { CountriesResponse } from './dto/countries.response.dto';
import { CountryResponse } from './dto/country.response.dto';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';

/**
 * An API for country table.
 */
@ApiTags('Country')
@Controller('country')
export class CountryController extends BaseController {
	constructor(
		@Inject(DIToken.COUNTRY_SERVICE_INTERFACE)
		private readonly countryService: CountryServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of country.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns a list of all the records of country.'
		},
		apiResponseData: {
			status: 200,
			type: CountriesResponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@Get()
	@NoAuthRoute()
	// @Permissions(`CNTRY:${PermissionEnum.VIEW}`)
	public async get(): Promise<CountryEntity[]> {
		return await this.countryService.getAll();
	}

	/**
	 * Returns a single record of country based on the given country id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of country based on the given country id.'
		},
		apiResponseData: { status: 200, type: CountryResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`CNTRY:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<CountryEntity> {
		return await this.countryService.getOneById(id);
	}

	/**
	 * Create new country.
	 * @param {CreateCountryDto} data - Data which need to be inserted in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new country.' },
		apiSecurityData: 'accessToken'
	})
	@Post()
	@Permissions(`CNTRY:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateCountryDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.countryService.create(data)).countryId;
	}

	/**
	 * Update an existing country
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCountryDto} data - Data which need to be updated in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing country' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`CNTRY:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateCountryDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.countryService.update(data.countryId, data)).affected >
			0
		);
	}

	/**
	 * Delete country based on the given country id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete country based on the given country id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`CNTRY:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.countryService.delete(id)).affected > 0;
	}
}
