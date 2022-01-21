import { ConfigProvider } from './ConfigProvider';
import { IMealPlannerService } from '../core/ports/MealPlannerService.interface';
import { MealPlanner } from './../core/models/MealPlanner';
import { UpdateMealPlannerCommand } from '../core/commands/UpdateMealPlannerCommand';

export class MealPlannerService implements IMealPlannerService {
	async update(
		updateMealPlannerCommand: UpdateMealPlannerCommand,
	): Promise<MealPlanner> {
		const config = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${config.API_HOSTNAME}:${config.API_PORT}/mealPlanners`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				body: JSON.stringify(updateMealPlannerCommand),
			},
		);

		const responseBody = await response.json();

		if (!response.ok) {
			throw new Error(responseBody.message);
		}

		return responseBody as MealPlanner;
	}
}
