import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../src/infrastructure/ioc/user.module';
import { getConnection } from 'typeorm';

describe('UserController (e2e)', () => {
	let app: INestApplication;
	let moduleFixture: TestingModule;

	beforeAll(async () => {
		moduleFixture = await Test.createTestingModule({
			imports: [
				UserModule,
				TypeOrmModule.forRoot({
					type: 'sqlite',
					database: ':memory:',
					dropSchema: true,
					entities: ['../src/infrastructure/database/mapper/*.ts'],
					migrations: ['../migrations/*.js'],
					migrationsRun: true,
					synchronize: true,
					logging: false,
				}),
			],
		}).compile();

		const connection = await getConnection();
		await connection.runMigrations();
		console.log(
			await connection.query(
				"SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%';",
			),
		);
	});

	beforeEach(async () => {
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
