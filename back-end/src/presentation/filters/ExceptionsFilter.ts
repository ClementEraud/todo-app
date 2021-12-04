import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

const ExceptionsResponseMapper = {
	UserNotFound: {
		statusCode: 404,
		message: 'User Not Found',
	},
	BadPassword: {
		statusCode: 400,
		message: 'Bad Password',
	},
	UsernameAlreadyUsed: {
		statusCode: 400,
		message: 'Username already used',
	},
};

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();

		const exceptionResponse =
			ExceptionsResponseMapper[exception.constructor.name];

		const httpStatus = exceptionResponse
			? exceptionResponse.statusCode
			: HttpStatus.INTERNAL_SERVER_ERROR;

		const responseBody = {
			statusCode: httpStatus,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			message: exceptionResponse ? exceptionResponse.message : undefined,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
	}
}
