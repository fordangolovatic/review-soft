import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { LanguageModule } from '../language.module';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';

/**
 * A swagger documentation generator class for language table.
 */
export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Language');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [LanguageModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.LANGUAGE, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
