import { IMealOfTheDayWriteRepository } from '../../application/ports/mealOfTheDay/MealOfTheDayWriteRepository.interface';
import { IUserReadRepository } from '../../application/ports/user/UserReadRepository.interface';
import { MealOfTheDaySchema } from '../database/mapper/MealOfTheDaySchema';
import { MealOfTheDayWriteRepository } from '../database/repositories/mealOfTheDay/MealOfTheDayWriteRepository';
import { MealPlannerController } from '../../consumers/rest_api/controller/mealPlanner.controller';
import { Module } from '@nestjs/common/decorators/modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateMeal } from '../../application/use_cases/UpdateMeal';
import { UserReadRepository } from '../database/repositories/user/UserReadRepository';
import { UserSchema } from '../database/mapper/UserSchema';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserSchema]),
		TypeOrmModule.forFeature([MealOfTheDaySchema]),
	],
	controllers: [MealPlannerController],
	providers: [
		UpdateMeal,
		{ provide: IUserReadRepository, useClass: UserReadRepository },
		{
			provide: IMealOfTheDayWriteRepository,
			useClass: MealOfTheDayWriteRepository,
		},
	],
})
export class MealPlannerModule {}
