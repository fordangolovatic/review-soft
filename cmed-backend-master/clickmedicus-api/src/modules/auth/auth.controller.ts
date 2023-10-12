import {
	Body,
	Controller,
	Inject,
	Post,
	Request,
	UseGuards
} from '@nestjs/common';

import { DIToken } from '@core/constants/enums/ditoken.enum';
import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { JwtLogoutGuard } from '@core/guards/passport/jwt-logout.guard';
import { JwtRefreshGuard } from '@core/guards/passport/jwt-refresh.guard';

import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { AuthServiceInterface } from './interfaces/auth.service.interface';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '@core/guards/passport/local-auth.guard';
/**
 * An API for authentication and authorization.
 */
@ApiTags('Auth')
@NoAuthRoute()
@Controller('auth')
export class AuthController {
	/**
	 * Constructor.
	 * @param authService Any class which have implemented [AuthServiceInterface]{@link AuthServiceInterface}
	 */
	constructor(
		@Inject(DIToken.AUTH_SERVICE_INTERFACE)
		private authService: AuthServiceInterface,
		private readonly configService: ConfigService
	) {}

	/**
	 * Authenticate user upon login.
	 * @param request Request context
	 * @returns Logged in user details / error message.
	 */
	@UseGuards(LocalAuthGuard)
	@Post('login')
	public async login(
		@Request() request,
		@Body() login: LoginDto
	): Promise<{
		accessToken: string;
		refreshToken: string;
	}> {
		return this.authService.createUserSession(request.user, login);
	}

	/**
	 * Validate refresh token.
	 * @param request Request ccontext
	 * @returns New access token / error message.
	 */
	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	public async validateRefreshToken(@Request() request): Promise<any> {
		return this.authService.generateAccessToken(request.user);
	}

	/**
	 * Logout user session.
	 * @param request Request ccontext
	 * @returns true / false.
	 */
	@UseGuards(JwtLogoutGuard)
	@Post('logout')
	public async logout(): Promise<boolean> {
		return true;
	}
}
