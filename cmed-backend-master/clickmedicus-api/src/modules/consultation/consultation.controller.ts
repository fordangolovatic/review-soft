import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';
import {
	Body,
	Controller,
	Get,
	Inject,
	Param,
	Post,
	Delete,
	Query,
	Patch
} from '@nestjs/common';
import { ApiTags, OmitType } from '@nestjs/swagger';
import { ConsultationsService } from './consultation.service';
import { CreateConsultationDto } from './dto/create-consultations.dto';
import { DIToken } from '@core/constants/enums/ditoken.enum';
import { UpdateConsultationDto } from './dto/update-consultations.dto';
import { ConsultationsServiceInterface } from './interfaces/consultations.service.interface';
import { User } from '@core/decorators/user.decorator';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';

@ApiTags('Consultations')
@Controller('consultations')
export class ConsultationsController {
	constructor(
		@Inject(DIToken.CONSULTATIONS_SERVICE_INTERFACE)
		private readonly consultationsService: ConsultationsServiceInterface
	) {}

	@Get('')
	findAll(@User() user: UserAccountEntity) {
		return this.consultationsService.getAllConsultationSessionsForDoctor(
			user
		);
	}

	@SwaggerRouteDecorator({
		apiBodyData: {
			type: CreateConsultationDto
		},
		apiResponseData: { status: 201, type: CreateConsultationDto },
		apiSecurityData: 'accessToken'
	})
	@Post('')
	public async create(
		@Body() data: CreateConsultationDto,
		@User() user: UserAccountEntity
	) {
		return await this.consultationsService.create(data, user);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 200 },
		apiSecurityData: 'accessToken',
		apiBodyData: { type: UpdateConsultationDto }
	})
	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateConsultationDto: UpdateConsultationDto
	) {
		return this.consultationsService.updateById(+id, updateConsultationDto);
	}
}
