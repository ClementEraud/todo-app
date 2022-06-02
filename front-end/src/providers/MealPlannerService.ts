import { ConfigProvider } from './ConfigProvider';
import { IMealPlannerService } from '../core/ports/MealPlannerService.interface';
import { MealPlanner } from './../core/models/MealPlanner';
import { UpdateMealPlannerCommand } from '../core/commands/UpdateMealPlannerCommand';


/* class decorator */
function staticImplements<T>() {
	return <U extends T>(constructor: U) => {constructor};
}
@staticImplements<IMealPlannerService>()
export class MealPlannerService {
	static async update(
		updateMealPlannerCommand: UpdateMealPlannerCommand,
		token: string,
	): Promise<MealPlanner> {
		const config = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${config.API_HOSTNAME}:${config.API_PORT}/mealPlanners`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					'Authorization': 'Bearer ' + token
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
