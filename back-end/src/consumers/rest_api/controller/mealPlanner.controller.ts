import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../application/auth/jwt-auth.guard';
import { MealPlannerVM } from '../view-models/MealPlannerVM';
import { UpdateMeal } from '../../../application/use_cases/UpdateMeal';
import { UpdateMealPlannerInput } from '../inputs/UpdateMealPlannerInput';

@ApiTags('mealPlanners')
@Controller('mealPlanners')
export class MealPlannerController {
	constructor(private readonly updateMeal: UpdateMeal) {}

	@UseGuards(JwtAuthGuard)
	@Patch('me')
	@ApiCreatedResponse({
		description: 'Update Meal Planner.',
		type: MealPlannerVM,
	})
	async update(
		@Request() req,
		@Body() updateMeal: UpdateMealPlannerInput,
	): Promise<MealPlannerVM> {
		return new MealPlannerVM(
			await this.updateMeal.execute({ userId: req.user.userId, ...updateMeal }),
		);
	}
}
