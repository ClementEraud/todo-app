import { IMealOfTheDayWriteRepository } from '../../application/ports/mealOfTheDay/MealOfTheDayWriteRepository.interface';
import { IUserReadRepository } from '../../application/ports/user/UserReadRepository.interface';
import { MealOfTheDayWriteRepository } from '../database/repositories/mealOfTheDay/MealOfTheDayWriteRepository';
import { MealPlannerController } from '../../presentation/controller/mealPlanner.controller';
import { Module } from '@nestjs/common/decorators/modules';
import { UpdateMeal } from '../../application/use_cases/UpdateMeal';
import { UserReadRepository } from '../database/repositories/user/UserReadRepository';

@Module({
	imports: [],
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
