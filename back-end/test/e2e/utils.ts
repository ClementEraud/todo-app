import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from '../../src/presentation/filters/ExceptionsFilter';
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
				type: 'sqlite',
				database: ':memory:',
				dropSchema: true,
				entities: ['src/infrastructure/database/mapper/*.ts'],
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
