import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { CountryModule } from '../country.module';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';

/**
 * A swagger documentation generator class for country table.
 */
export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Country');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [CountryModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.COUNTRY, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
