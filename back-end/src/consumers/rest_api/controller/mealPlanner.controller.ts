import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Patch } from '@nestjs/common';
import { MealPlannerVM } from '../view-models/MealPlannerVM';
import { UpdateMeal } from '../../../application/use_cases/UpdateMeal';
import { UpdateMealPlannerInput } from '../inputs/UpdateMealPlannerInput';

@ApiTags('mealPlanners')
@Controller('mealPlanners')
export class MealPlannerController {
	constructor(private readonly updateMeal: UpdateMeal) {}

	@Patch()
	@ApiCreatedResponse({
		description: 'Update Meal Planner.',
		type: MealPlannerVM,
	})
	async update(
		@Body() updateMeal: UpdateMealPlannerInput,
	): Promise<MealPlannerVM> {
		return new MealPlannerVM(await this.updateMeal.execute(updateMeal));
	}
}
