import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { createDocumentBuilder } from '@config/swagger/util.swagger';
import { CUSTOM_CSS } from '@core/constants/swagger.constant';
import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';
import { PostModule } from '../post.module';

/**
 * A swagger documentation generator class for post table.
 */
export default function getSwaggerDocument(app: INestApplication) {
	const documentBuilder = createDocumentBuilder('Post');

	const document = SwaggerModule.createDocument(app, documentBuilder, {
		include: [PostModule]
	});

	SwaggerModule.setup(SwaggerApiKeys.POST, app, document, {
		customCss: CUSTOM_CSS,
		customJs: 'custom.js',
		swaggerOptions: {
			persistAuthorization: true
		}
	});
}
