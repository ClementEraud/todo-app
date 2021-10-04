import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../../src/infrastructure/ioc/user.module';

describe('UserController (e2e)', () => {
	let app: INestApplication;
	let moduleFixture: TestingModule;

	beforeAll(async () => {
		moduleFixture = await Test.createTestingModule({
			imports: [UserModule],
		}).compile();
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
