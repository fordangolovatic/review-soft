import {
	ArgumentsHost, Catch,
	ExceptionFilter, HttpException,
	HttpStatus
} from '@nestjs/common';

import { Response } from 'express';

import GenericResponse from '@base/dto/genericresponse.dto';

/**
 * A generic exception filter to handle all the exceptions.
 */
@Catch()
export class GenericExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
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

		const statusCode =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.BAD_REQUEST;

		const customResponse = new GenericResponse<[] | unknown>(
			statusCode,
			errorData,
			[
				{
					field: '',
					errors: [exception.message]
				}
			] ?? []
		);

		return response.status(statusCode).json(customResponse);
	}
}
