import { APP_FILTER } from '@nestjs/core';
import { ExceptionsFilter } from './consumers/filters/ExceptionsFilter';
import { MealPlannerModule } from './consumed/ioc/mealPlanner.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './consumed/ioc/user.module';

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
