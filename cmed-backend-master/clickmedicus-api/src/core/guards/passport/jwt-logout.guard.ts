import {
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtLogoutGuard extends AuthGuard('jwt-logout') {
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest(error: any, user: any) {
		if (error || !user) {
			throw error || new UnauthorizedException();
		}

		return user;
	}
}
