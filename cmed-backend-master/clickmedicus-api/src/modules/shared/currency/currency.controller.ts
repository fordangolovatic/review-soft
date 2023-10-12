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

import { CurrencyServiceInterface } from './interfaces/currency.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CurrencyEntity } from './entities/currency.entity';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { CurrenciesReponse } from './dto/currencies.response.dto';
import { CurrencyReponse } from './dto/currency.response.dto';

/**
 * An API for currency table.
 */
@ApiTags('Currency')
@Controller('currency')
@ApiExcludeController()
export class CurrencyController extends BaseController {
	constructor(
		@Inject(DIToken.CURRENCY_SERVICE_INTERFACE)
		private readonly currencyService: CurrencyServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of currency.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: {
			status: 200,
			type: CurrenciesReponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@Get()
	@Permissions(`CURNCY:${PermissionEnum.VIEW}`)
	public async get(): Promise<CurrencyEntity[]> {
		return await this.currencyService.getAll();
	}

	/**
	 * Returns a single record of currency based on the given currency id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: { status: 200, type: CurrencyReponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`CURNCY:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<CurrencyEntity> {
		return await this.currencyService.getOneById(id);
	}

	/**
	 * Create new currency.
	 * @param {CreateCurrencyDto} data - Data which need to be inserted in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new currency.' },
		apiSecurityData: 'accessToken'
	})
	@Post()
	@Permissions(`CURNCY:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateCurrencyDto,
		@User() user: UserAccountEntity
	): Promise<number> {
		data.createdBy = user.userId;
		return (await this.currencyService.create(data)).currencyId;
	}

	/**
	 * Update an existing currency
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateCurrencyDto} data - Data which need to be updated in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing currency.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`CURNCY:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateCurrencyDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.currencyService.update(data.currencyId, data))
				.affected > 0
		);
	}

	/**
	 * Delete currency based on the given currency id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete currency based on the given currency id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`CURNCY:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.currencyService.delete(id)).affected > 0;
	}
}
