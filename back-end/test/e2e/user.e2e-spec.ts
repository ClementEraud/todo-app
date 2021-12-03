import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { buildTestModule } from './utils';

describe('UserController (e2e)', () => {
	let app: INestApplication;
	let moduleFixture: TestingModule;

	beforeEach(async () => {
		moduleFixture = await buildTestModule('test/e2e/dataset-user.ts');
		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(() => app.close());

	it('/users (GET)', async () =>
		request(app.getHttpServer())
			.get('/users')
			.expect(200)
			.expect((res: request.Response) => {
				expect(res.body[0].firstName).toBe('Tyler');
				expect(res.body[0].lastName).toBe('Chavez');
				expect(res.body[1].firstName).toBe('Ricardo');
				expect(res.body[1].lastName).toBe('Munoz');
			}));

	it('/users (POST)', async () =>
		request(app.getHttpServer())
			.post('/users')
			.send({
				firstName: 'Jean',
				lastName: 'Michel',
				username: 'JeanMichel',
				password: 'password',
			})
			.expect(201)
			.expect((res: request.Response) => {
				expect(res.body.firstName).toBe('Jean');
				expect(res.body.lastName).toBe('Michel');
			}));

	it('/users/:id (GET)', async () =>
		request(app.getHttpServer())
			.get('/users/0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0')
			.expect(200)
			.expect((res: request.Response) => {
				expect(res.body.firstName).toBe('Tyler');
				expect(res.body.lastName).toBe('Chavez');
			}));

	it('/users/:id (PATCH)', async () =>
		request(app.getHttpServer())
			.patch('/users/0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0')
			.send({ firstName: 'Michou' })
			.expect(200)
			.expect((res: request.Response) => {
				expect(res.body.firstName).toBe('Michou');
				expect(res.body.lastName).toBe('Chavez');
			}));

	it('/users/:id (DELETE)', async () => {
		await request(app.getHttpServer())
			.delete('/users/0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0')
			.expect(200);

		return request(app.getHttpServer())
			.get('/users')
			.expect(200)
			.expect((res: request.Response) => {
				expect(res.body[0].firstName).toBe('Ricardo');
				expect(res.body[0].lastName).toBe('Munoz');
			});
	});

	it('/users/:id/add-task (POST)', async () =>
		request(app.getHttpServer())
			.post('/users/0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0/add-task')
			.send({ title: 'Task 1', description: 'Task description' })
			.expect(201)
			.expect((res: request.Response) => {
				expect(res.body.firstName).toBe('Tyler');
				expect(res.body.lastName).toBe('Chavez');
				expect(res.body.tasks.length).toBe(1);
				expect(res.body.tasks[0].title).toBe('Task 1');
				expect(res.body.tasks[0].description).toBe('Task description');
			}));
});
