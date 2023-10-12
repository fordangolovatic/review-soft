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

import { LanguageServiceInterface } from './interfaces/language.service.interface';

import { BaseController } from '@base/controller/base.controller';
import { PermissionEnum } from '@core/constants/enums/permission.enum';
import { Permissions } from '@core/decorators/permission.decorator';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { LanguageEntity } from './entities/language.entity';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { LanguagesResponse } from './dto/languages.response.dto';
import { LanguageResponse } from './dto/language.response.dto';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';

/**
 * An API for language table.
 */
@ApiTags('Language')
@Controller('language')
export class LanguageController extends BaseController {
	constructor(
		@Inject(DIToken.LANGUAGE_SERVICE_INTERFACE)
		private readonly languageService: LanguageServiceInterface
	) {
		super();
	}

	/**
	 * Returns a list of all the records of language.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Returns a list of all the records of language..'
		},
		apiResponseData: {
			status: 200,
			type: LanguagesResponse,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@Get()
	@NoAuthRoute()
	// @Permissions(`LNGUAG:${PermissionEnum.VIEW}`)
	public async get(): Promise<LanguageEntity[]> {
		return await this.languageService.getAll();
	}

	/**
	 * Returns a single record of language based on the given language id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary:
				'Returns a single record of language based on the given language id.'
		},
		apiResponseData: { status: 200, type: LanguageResponse },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	@Permissions(`LNGUAG:${PermissionEnum.VIEW}`)
	public async getOneById(
		@Param('id', ParseIntPipe) id: number
	): Promise<LanguageEntity> {
		return await this.languageService.getOneById(id);
	}

	/**
	 * Create new language.
	 * @param {CreateLanguageDto} data - Data which need to be inserted in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Create new language.' },
		apiSecurityData: 'accessToken'
	})
	@Post()
	@Permissions(`LNGUAG:${PermissionEnum.CREATE}`)
	public async create(
		@Body() data: CreateLanguageDto,
		@User() user: UserAccountEntity
	) {
		data.createdBy = user.userId;
		return this.languageService.create(data, user);
	}

	/**
	 * Update an existing language
	 * @param {number} id - Primary key of the table.
	 * @param {UpdateLanguageDto} data - Data which need to be updated in database table.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: { summary: 'Update an existing language.' },
		apiSecurityData: 'accessToken'
	})
	@Put()
	@Permissions(`LNGUAG:${PermissionEnum.MODIFY}`)
	public async update(
		@Body() data: UpdateLanguageDto,
		@User() user: UserAccountEntity
	): Promise<boolean> {
		data.modifiedBy = user.userId;
		return (
			(await this.languageService.update(data.languageId, data))
				.affected > 0
		);
	}

	/**
	 * Delete language based on the given language id.
	 * @param {number} id - a unique id / primary key.
	 */
	@SwaggerRouteDecorator({
		apiOperationData: {
			summary: 'Delete language based on the given language id.'
		},
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	@Permissions(`LNGUAG:${PermissionEnum.DELETE}`)
	public async delete(
		@Param('id', ParseIntPipe) id: number
	): Promise<boolean> {
		return (await this.languageService.delete(id)).affected > 0;
	}
}
