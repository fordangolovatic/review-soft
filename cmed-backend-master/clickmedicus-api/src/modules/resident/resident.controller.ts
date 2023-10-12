import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResidentService } from './resident.service';
import { QueryResidentsDto } from './dto/residents.query.dto';
import { ResidentDto } from './dto/resident.dto';

@ApiTags('Residents')
@Controller('residents')
export class ResidentController {
	constructor(private readonly residentService: ResidentService) {}
	@SwaggerRouteDecorator({
		apiResponseData: {
			type: ResidentDto,
			status: 200,
			isArray: true
		},
		apiOperationData: {
			summary: 'Returns a list of residents based on set query_params.'
		},
		apiQueryOptions: [
			{
				name: 'firstName',
				description: 'First name',
				required: false,
				type: 'string'
			},
			{
				name: 'lastName',
				description: 'Last name',
				required: false,
				type: 'string'
			},
			{
				name: 'languages',
				description: 'Languages to include',
				required: false,
				isArray: true,
				type: 'array'
			},
			{
				name: 'countries',
				description: 'Countries to include',
				required: false,
				isArray: true,
				type: 'array'
			}
		]
	})
	@NoAuthRoute()
	@Get()
	findAll(@Query() query: QueryResidentsDto) {
		return this.residentService.findAll(query);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { type:ResidentDto, status: 200 },
		apiOperationData: {
			summary: 'Returns a resident profile based on given user_id.'
		},
		apiSecurityData: 'accessToken'
	})
	@NoAuthRoute()
	@Get(':id')
	findById(@Param('id') id: number) {
		return this.residentService.findProfileById(id);
	}
}
