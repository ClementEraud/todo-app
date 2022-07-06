import {
	DocumentBuilder,
	SwaggerDocumentOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './consumers/rest_api/filters/ExceptionsFilter';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	app.useGlobalFilters(new ExceptionsFilter(app.get(HttpAdapterHost)));

	const config = new DocumentBuilder()
		.setTitle('Todo App - API')
		.setDescription('This describes the Todo App API')
		.setVersion('0.0.1')
		.addTag('users')
		.build();

	const options: SwaggerDocumentOptions = {
		operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
	};

	const document = SwaggerModule.createDocument(app, config, options);
	SwaggerModule.setup('', app, document);
	const port = process.env.API_PORT ? process.env.API_PORT : 3000;
	await app.listen(port);
	console.info(`Listenning to port : ${port} !`);
}
bootstrap();
