import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './presentation/filters/ExceptionsFilter';
import { MealPlannerModule } from './infrastructure/ioc/mealPlanner.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './infrastructure/ioc/user.module';

@Module({
	imports: [UserModule, MealPlannerModule, TypeOrmModule.forRoot()],
	providers: [
		{
			provide: APP_FILTER,
			useClass: ExceptionsFilter,
		},
	],
})
export class AppModule {}
