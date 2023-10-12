import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { DIToken } from '@core/enums/ditoken.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(DIToken.AUTH_SERVICE_INTERFACE)
		private authService: AuthService
	) {
		super({
			passReqToCallback: true
		});
	}

	async validate(
		req: Request,
		username: string,
		password: string
	): Promise<any> {
		const user = await this.authService.authenticate(
			username,
			password,
			false
			// req.body['isForAdmin']
		);

		// if (!user) {
		// 	throw new UnauthorizedException();
		// }

		return user;
	}
}
