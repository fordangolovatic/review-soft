import {
	ArgumentsHost,
	Catch, ExceptionFilter, HttpException, HttpStatus
} from '@nestjs/common';

import { Response } from 'express';

import GenericResponse from '@base/dto/genericresponse.dto';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';
import { formatI18nErrors } from 'nestjs-i18n/dist/utils/util';

/**
 * A validation exception filter to handle all the exceptions related to validations.
 */
@Catch(I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
	catch(exception: I18nValidationException, host: ArgumentsHost) {
		const httpContext = host.switchToHttp();

		const response = httpContext.getResponse<Response>();
		const requestHttpMethod = response.req.method;
		let errorData: unknown;

		switch (requestHttpMethod) {
			case 'POST':
				errorData = null;
				break;
			case 'PUT':
			case 'DELETE':
				errorData = true;
				break;
			default:
				errorData = [];
				break;
		}

		const i18n = I18nContext.current();

		const errors = formatI18nErrors(exception.errors ?? [], i18n.service, {
			lang: i18n.lang,
		});

		let statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.BAD_REQUEST;

		statusCode =
			errors.length > 0 ? HttpStatus.BAD_REQUEST : statusCode;

		const propertyList = errors.map(
			(x: { property: any }) => x.property
		);

		const messages = [];

		propertyList.forEach((property: string | number) => {
			const exceptionObj = errors.find(
				(x: { property: string | number }) => x.property === property
			);

			if (exceptionObj) {
				messages.push({
					field: property,
					errors: Object.values(exceptionObj.constraints)
				});
			}
		});

		const customResponse = new GenericResponse<[] | unknown>(
			errors.length > 0 ? HttpStatus.BAD_REQUEST : statusCode,
			errorData,
			messages
		);

		return response.status(statusCode).json(customResponse);
	}
}
