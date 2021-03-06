import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from '../../src/consumers/rest_api/filters/ExceptionsFilter';
import { Test } from '@nestjs/testing/test';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Create Testing Module
 * @param {string} datasetPath Path of dataset to use
 * @returns {Promise<TestingModule>}
 */
export const buildTestModule = async (datasetPath: string, modules) =>
	await Test.createTestingModule({
		imports: [
			...modules,
			TypeOrmModule.forRoot({
				type: 'better-sqlite3',
				database: ':memory:',
				dropSchema: true,
				autoLoadEntities: true,
				entities: ['src/consumed/database/mapper/*.ts'],
				migrations: [datasetPath],
				migrationsRun: true,
				logging: false,
				synchronize: true,
			}),
		],
		providers: [
			{
				provide: APP_FILTER,
				useClass: ExceptionsFilter,
			},
		],
	}).compile();
