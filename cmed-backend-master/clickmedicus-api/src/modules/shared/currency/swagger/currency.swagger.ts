// import { createDocumentBuilder } from '@config/swagger/util.swagger';
// import { SwaggerApiKeys } from '@core/constants/enums/swagger.enum';
// import { CUSTOM_CSS } from '@core/constants/swagger.constant';
// import { INestApplication } from '@nestjs/common';
// import { SwaggerModule } from '@nestjs/swagger';
// import { CurrencyModule } from '../currency.module';
//
// /**
//  * A swagger documentation generator class for currency table.
//  */
// export default function getSwaggerDocument(app: INestApplication) {
// 	const documentBuilder = createDocumentBuilder('Currency');
//
// 	const document = SwaggerModule.createDocument(app, documentBuilder, {
// 		include: [CurrencyModule]
// 	});
//
// 	SwaggerModule.setup(SwaggerApiKeys.CURRENCY, app, document, {
// 		customCss: CUSTOM_CSS,
// 		customJs: 'custom.js',
// 		swaggerOptions: {
// 			persistAuthorization: true
// 		}
// 	});
// }
