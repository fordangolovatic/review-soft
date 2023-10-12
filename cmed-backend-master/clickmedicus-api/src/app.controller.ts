import { NoAuthRoute } from '@core/decorators/noauth.decorator';
import { Controller, Get } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AppService } from './app.service';
import { I18nTranslations } from './generated/i18n.generated';

@NoAuthRoute()
@Controller('app')
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly i18nService: I18nService<I18nTranslations>
	) { }

	@Get()
	async getHello(): Promise<{}> {
		const result = await this.i18nService.t(`translation.HELLO`, { lang: 'ro' });
		return {
			msg: result
		};
	}
}
