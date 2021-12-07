import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from '../../src/presentation/filters/ExceptionsFilter';
import { Test } from '@nestjs/testing/test';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../src/infrastructure/ioc/user.module';

/**
 * Create Testing Module
 * @param {string} datasetPath Path of dataset to use
 * @returns {Promise<TestingModule>}
 */
export const buildTestModule = async (datasetPath: string) =>
	await Test.createTestingModule({
		imports: [
			UserModule,
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
