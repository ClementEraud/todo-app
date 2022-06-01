import * as request from 'supertest';
import { ExceptionsFilter } from '../../src/consumers/filters/ExceptionsFilter';
import { HttpAdapterHost } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { MealPlannerModule } from '../../src/consumed/ioc/mealPlanner.module';
import { TestingModule } from '@nestjs/testing';
import { UserModule } from '../../src/consumed/ioc/user.module';
import { buildTestModule } from './utils';

describe('MealPlannerController (e2e)', () => {
	let app: INestApplication;
	let moduleFixture: TestingModule;

	beforeAll(async () => {
		moduleFixture = await buildTestModule('test/e2e/dataset-user.ts', [
			MealPlannerModule,
			UserModule,
		]);
		app = moduleFixture.createNestApplication();
		await app.init();
		const { httpAdapter } = app.get(HttpAdapterHost);
		app.useGlobalFilters(new ExceptionsFilter(httpAdapter));
	});

	afterAll(() => app.close());

	describe('/mealPlanners (PATCH)', () => {
		it('GIVEN valid meal planner params SHOULD return updated mealPlanner.', async () =>
			request(app.getHttpServer())
				.patch('/mealPlanners')
				.send({
					userId: '0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0',
					day: 'monday',
					lunchOrDinner: 'lunch',
					meal: 'Soup',
				})
				.expect(200)
				.expect((res: request.Response) => {
					expect(res.body.monday.lunch).toEqual('Soup');
				})
				.then(() =>
					request(app.getHttpServer())
						.get('/users/0f9a61c0-9c3f-4fe9-afe0-47876d18f8c0/get-meal-planner')
						.expect(200)
						.expect((res: request.Response) => {
							expect(res.body.monday.lunch).toEqual('Soup');
						}),
				));
	});
});
