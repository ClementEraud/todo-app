import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './consumers/rest_api/filters/ExceptionsFilter';
import { LoggerOptions } from 'typeorm';
import { MealPlannerModule } from './consumed/ioc/mealPlanner.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './consumed/ioc/user.module';

const {
	TYPEORM_HOST,
	TYPEORM_USERNAME,
	TYPEORM_PASSWORD,
	TYPEORM_DATABASE,
	TYPEORM_PORT,
	TYPEORM_LOGGING,
	TYPEORM_ENTITIES,
	TYPEORM_MIGRATIONS,
	TYPEORM_MIGRATIONS_RUN,
	TYPEORM_SYNCHRONIZE } = process.env;

@Module({
	imports: [UserModule, MealPlannerModule, TypeOrmModule.forRoot(
		{
			type: 'mysql',
			host: TYPEORM_HOST,
			username: TYPEORM_USERNAME,
			password: TYPEORM_PASSWORD,
			database: TYPEORM_DATABASE,
			port: Number(TYPEORM_PORT),
			logging: TYPEORM_LOGGING as LoggerOptions,
			entities: [TYPEORM_ENTITIES],
			migrations: [TYPEORM_MIGRATIONS],
			migrationsRun: Boolean(TYPEORM_MIGRATIONS_RUN),
			synchronize: Boolean(TYPEORM_SYNCHRONIZE)
		}
	)],
	providers: [
		{
			provide: APP_FILTER,
			useClass: ExceptionsFilter,
		},
	],
})
export class AppModule {}
