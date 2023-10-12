import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';
import { AppModule } from './app.module';
import { API_PREFIX } from '@core/constants/common.constant';
import { I18nValidationPipe } from 'nestjs-i18n';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const documentConfig = new DocumentBuilder()
		.setTitle('ClickMedicus Api')
		.setVersion('1.0')
		.addTag('Simple')
		.addServer('/api/v1/')
		.setDescription('')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				description: 'Enter JWT token',
				in: 'header'
			},
			'accessToken'
		)
		.build();

	const document = SwaggerModule.createDocument(app, documentConfig);

	SwaggerModule.setup('/api/docs', app, document);

	// API versioning
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1'
	});

	app.enableCors();

	app.setGlobalPrefix(`${API_PREFIX}`);

	app.useGlobalPipes(new I18nValidationPipe());

	await app.listen(process.env.SERVER_PORT);

	console.log('Server is listening at port', process.env.SERVER_PORT);
}

bootstrap();
