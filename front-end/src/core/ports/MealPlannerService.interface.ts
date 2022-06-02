import { MealPlanner } from '../models/MealPlanner';
import { UpdateMealPlannerCommand } from './../commands/UpdateMealPlannerCommand';

export interface IMealPlannerService {
	/**
	 * Update Meal Planner.
	 */
	update(
		updateMealPlannerCommand: UpdateMealPlannerCommand,
		token: string
	): Promise<MealPlanner>;
}
