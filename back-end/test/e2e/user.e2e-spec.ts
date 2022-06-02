import * as request from 'supertest';
import { ExceptionsFilter } from '../../src/consumers/rest_api/filters/ExceptionsFilter';
import { HttpAdapterHost } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { UserModule } from '../../src/consumed/ioc/user.module';
import { buildTestModule } from './utils';

describe('UserController (e2e)', () => {
	let app: INestApplication;
	let moduleFixture: TestingModule;
	let validToken: string;

	beforeAll(async () => {
		moduleFixture = await buildTestModule('test/e2e/dataset-user.ts', [
			UserModule,
		]);
		app = moduleFixture.createNestApplication();
		await app.init();
		const { httpAdapter } = app.get(HttpAdapterHost);
		app.useGlobalFilters(new ExceptionsFilter(httpAdapter));
	});

	afterAll(() => app.close());

	describe('/users (POST)', () => {
		it('GIVEN valid datas SHOULD return newly created user.', async () =>
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
					expect(res.body.mealPlanner).toBeDefined();
				}));

		it('GIVEN used username SHOULD return 400 and Username already used error.', async () =>
			request(app.getHttpServer())
				.post('/users')
				.send({
					firstName: 'Jean',
					lastName: 'Michel',
					username: 'JeanMichel',
					password: 'password',
				})
				.expect(400)
				.expect((res: request.Response) => {
					expect(res.body.message).toBe('Username already used');
				}));

		it('GIVEN no username and no firstName SHOULD return 400 and Missing required properties error.', async () =>
			request(app.getHttpServer())
				.post('/users')
				.send({
					lastName: 'Michel',
					password: 'password',
				})
				.expect(400)
				.expect((res: request.Response) => {
					expect(res.body.message).toStrictEqual({
						label: 'Missing required properties.',
						missingProperties: ['firstName', 'username'],
					});
				}));
	});

	describe('/users/login (POST)', () => {
		it('GIVEN valid username and password SHOULD return user.', async () =>
			request(app.getHttpServer())
				.post('/users/login')
				.send({ username: 'TylerChavez', password: 'password' })
				.expect(200)
				.expect((res: request.Response) => {
					expect(res).toBeDefined()
					validToken = res.text;
				}));

		it('GIVEN not existing username SHOULD return 400 Bad Request with User Not Found message.', async () =>
			request(app.getHttpServer())
				.post('/users/login')
				.send({ username: 'Georgie Townsend', password: 'password' })
				.expect(404)
				.expect((res: request.Response) => {
					expect(res.body.message).toBe('User Not Found');
				}));

		it('GIVEN valid username but bad password SHOULD return 400 Bad Request with Bad Password message.', async () =>
			request(app.getHttpServer())
				.post('/users/login')
				.send({ username: 'JeanMichel', password: 'bad_password' })
				.expect(400)
				.expect((res: request.Response) => {
					expect(res.body.message).toBe('Bad Password');
				}));
	});

	describe('/users/:id/add-task (POST)', () => {
		it('GIVEN valid task SHOULD add task to user.', async () =>
			request(app.getHttpServer())
				.post('/users/me/add-task')
				.set('Authorization', 'bearer ' + validToken)
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

	describe('/users/:id/get-meal-planner (GET)', () => {
		it('GIVEN valid user id SHOULD return mealPlanner.', async () =>
			request(app.getHttpServer())
				.get('/users/me/get-meal-planner')
				.set('Authorization', 'bearer ' + validToken)
				.expect(200)
				.expect((res: request.Response) => {
					expect(res.body.monday).toBeDefined();
					expect(res.body.tuesday).toBeDefined();
					expect(res.body.wednesday).toBeDefined();
					expect(res.body.thursday).toBeDefined();
					expect(res.body.friday).toBeDefined();
					expect(res.body.saturday).toBeDefined();
					expect(res.body.sunday).toBeDefined();
				}));
	});
});
