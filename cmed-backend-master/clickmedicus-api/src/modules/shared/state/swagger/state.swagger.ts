import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { StateModule } from '../state.module';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';

/**
 * A swagger documentation generator class for state table.
 */
export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('State');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [StateModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.STATE, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
