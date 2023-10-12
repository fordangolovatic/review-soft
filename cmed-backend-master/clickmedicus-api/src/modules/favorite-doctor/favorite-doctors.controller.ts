import { ApiTags } from '@nestjs/swagger';
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
import { FavoriteDoctorsServiceInterface } from './interfaces/favorite-doctors.service.interface';
import { UserAccountEntity } from '@modules/user/user-account/entities/user-account.entity';
import { User } from '@core/decorators/user.decorator';
import { CreateFavoriteDoctorDto } from './dto/create-favorite-doctor.dto';
import { SwaggerRouteDecorator } from '@modules/decorators/swagger.config';

@ApiTags('Favorite Doctors')
@Controller('favorite-doctors')
export class FavoriteDoctorsController {
	constructor(
		@Inject(DIToken.FAVORITE_DOCTORS_SERVICE_INTERFACE)
		private readonly favoriteDoctorsService: FavoriteDoctorsServiceInterface
	) {}

	@Get('')
	findAll(@User() user: UserAccountEntity) {
		return this.favoriteDoctorsService.getAll(user);
	}

	@SwaggerRouteDecorator({
		apiBodyData: {
			type: CreateFavoriteDoctorDto
		},
		apiResponseData: { status: 201, type: CreateFavoriteDoctorDto },
		apiSecurityData: 'accessToken'
	})
	@Post('add')
	public async create(
		@Body() data: CreateFavoriteDoctorDto,
		@User() user: UserAccountEntity
	) {
		return await this.favoriteDoctorsService.createFavoriteDoctor(
			data,
			user
		);
	}

	@SwaggerRouteDecorator({
		apiResponseData: { status: 204 },
		apiSecurityData: 'accessToken'
	})
	@Delete('remove/:id')
	remove(@Param('id') id: number) {
		return this.favoriteDoctorsService.delete(+id);
	}
}
