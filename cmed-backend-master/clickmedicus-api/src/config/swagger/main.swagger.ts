import AuthSwagger from '@modules/auth/swagger/auth.swagger';
import CitySwagger from '@modules/shared/city/swagger/city.swagger';
import CountrySwagger from '@modules/shared/country/swagger/country.swagger';
import LanguageSwagger from '@modules/shared/language/swagger/language.swagger';
import StateSwagger from '@modules/shared/state/swagger/state.swagger';
import UserAccountSwagger from '@modules/user/user-account/swagger/user-account.swagger';
import PostSwagger from '@modules/social-media/media/swagger/post.swagger';
import { INestApplication } from '@nestjs/common';

export function MainSwagger(app: INestApplication) {
	AuthSwagger(app);
	UserAccountSwagger(app);
	CountrySwagger(app);
	StateSwagger(app);
	CitySwagger(app);
	LanguageSwagger(app);
	PostSwagger(app);
}
