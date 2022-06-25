import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

const ExceptionsResponseMapper = (exception: any) => ({
	UserNotFound: {
		statusCode: 404,
		message: 'User Not Found',
		code: 'USER_NOT_FOUND',
	},
	BadPassword: {
		statusCode: 400,
		message: 'Bad Password',
		code: 'BAD_PASSWORD',
	},
	UsernameAlreadyUsed: {
		statusCode: 400,
		message: 'Username already used',
		code: 'USERNAME_ALREADY_USED',
	},
	MissingRequiredProperties: {
		statusCode: 400,
		message: {
			label: exception.message,
			missingProperties: exception.missingProperties,
		},
		code: 'MISSING_REQUIRED_PROPERTIES',
	},
	UnauthorizedException: {
		statusCode: 401,
		message: 'Unauthorized',
		code: 'UNAUTHORIZED',
	},
});

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const exceptionResponse =
			ExceptionsResponseMapper(exception)[exception.constructor.name];

		const httpStatus = exceptionResponse
			? exceptionResponse.statusCode
			: HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			message: exceptionResponse && exceptionResponse.message,
			code: exceptionResponse && exceptionResponse.code,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
