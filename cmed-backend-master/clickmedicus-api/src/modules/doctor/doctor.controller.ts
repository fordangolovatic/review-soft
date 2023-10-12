import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { QueryDoctorsDto } from './dto/doctors.query.dto';
import { DoctorDto } from './dto/doctor.dto';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
	constructor(private readonly doctorService: DoctorService) {}
	@SwaggerRouteDecorator({
		apiResponseData: {
			type: DoctorDto,
			status: 200,
			isArray: true
		},
		apiOperationData: {
			summary: 'Returns a list of doctors based on set query_params.'
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
				name: 'specialties',
				description: 'Specialities to include',
				required: false,
				isArray: true,
				type: 'array'
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
	findAll(@Query() query: QueryDoctorsDto) {
		return this.doctorService.findAll(query);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { type: DoctorDto, status: 200 },
		apiOperationData: {
			summary: 'Returns a doctor profile based on given user_id.'
		},
		apiSecurityData: 'accessToken'
	})
	@NoAuthRoute()
	@Get(':id')
	findById(@Param('id') id: number) {
		return this.doctorService.findProfileById(id);
	}
}
