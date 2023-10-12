import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';
import { MessageModule } from "../message.module";

/**
 * A swagger documentation generator class for account table.
 */
export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Messages');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [MessageModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.MESSAGES, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
