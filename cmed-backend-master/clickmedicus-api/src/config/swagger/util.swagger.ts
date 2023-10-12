import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { API_VERSION } from '@core/constants/common.constant';

export function createDocumentBuilder(
	moduleName: string
): Omit<OpenAPIObject, 'paths'> {
	const documentBuilder = new DocumentBuilder()
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			},
			'access-token'
		)
		.setTitle(
			moduleName
				? `ClickMedicus API Documentation (${moduleName})`
				: 'ClickMedicus API Documentation'
		)
		.setDescription(
			moduleName
				? `This is a complete API guide for ${moduleName} module.<br /><br /><br /><a href="${process.env.BASE_URL}">Home</a>`
				: `This is a complete API guide for ClickMedicus.<br /><br /><br /><a href="${process.env.BASE_URL}">Home</a>`
		)
		.setVersion(API_VERSION)
		.addTag(
			moduleName
				? `clickmedicus, api, nestjs, ${moduleName.toLowerCase()}`
				: 'clickmedicus, api, nestjs'
		)
		.build();

	return documentBuilder;
}
