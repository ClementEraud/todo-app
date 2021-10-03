import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [
				AppModule,
				TypeOrmModule.forRoot({
					type: 'mysql',
					host: 'localhost',
					port: 3306,
					username: 'root',
					password: 'password',
					database: 'todo',
					entities: ['../src/infrastructure/database/mapper/*.ts'],
				}),
			],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(() => app.close());

	it('/users (GET)', async () => {
		return request(app.getHttpServer())
			.get('/users')
			.expect(200)
			.expect(
				'[{"id":1,"firstName":"Jean","lastName":"Michel","tasks":[{"id":1,"title":"Task1","description":"First Task of User"}]},{"id":2,"firstName":"John","lastName":"Michel","tasks":[]}]',
			);
	});
});
