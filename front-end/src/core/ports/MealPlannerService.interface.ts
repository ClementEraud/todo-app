import { MealPlanner } from '../models/MealPlanner';
import { UpdateMealPlannerCommand } from './../commands/UpdateMealPlannerCommand';

export abstract class IMealPlannerService {
	/**
	 * Update Meal Planner.
	 */
	abstract update(
		updateMealPlannerCommand: UpdateMealPlannerCommand,
	): Promise<MealPlanner>;
}
