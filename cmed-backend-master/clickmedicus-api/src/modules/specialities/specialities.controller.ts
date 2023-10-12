import { BaseController } from '@base/controller/base.controller';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { User } from '@core/decorators/user.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Inject,
	Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SpecialitiesResponseDto } from './dto/specialities.response.dto';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { SpecialitiesServiceInterface } from './interfaces/specialities.service.interface';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';

@ApiTags('Specialities')
@Controller('specialities')
export class SpecialitiesController extends BaseController {
	constructor(
		@Inject(DIToken.SPECIALITIES_SERVICE_INTERFACE)
		private readonly specialitiesService: SpecialitiesServiceInterface
	) {
		super();
	}

	@SwaggerRouteDecorator({
		apiBodyData: { type: CreateSpecialityDto },
		apiResponseData: { status: 200, type: SpecialitiesResponseDto },
		apiSecurityData: 'accessToken'
	})
	@Post()
	create(@Body() body: CreateSpecialityDto, @User() user: UserAccountEntity) {
		return this.specialitiesService.createSpeciality(body, user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: {
			status: 204,
			type: SpecialitiesResponseDto,
			isArray: true
		},
		apiSecurityData: 'accessToken'
	})
	@NoAuthRoute()
	@Get()
	findAll(@User() user: UserAccountEntity) {
		return this.specialitiesService.findAll(user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 204, type: SpecialitiesResponseDto },
		apiSecurityData: 'accessToken'
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.specialitiesService.findOne(+id);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 204, type: SpecialitiesResponseDto },
		apiSecurityData: 'accessToken',
		apiQueryOptions: [
			{
				name: 'Radiology',
				description: '',
				example: 'Test',
				required: true
			}
		]
	})
	@Patch(':id')
	update(
		@Query() updateCategoryDto: UpdateSpecialityDto,
		@Param('id') id: string
	) {
		return this.specialitiesService.update(+id, updateCategoryDto);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 204 },
		apiSecurityData: 'accessToken'
	})
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.specialitiesService.remove(+id);
	}
}
