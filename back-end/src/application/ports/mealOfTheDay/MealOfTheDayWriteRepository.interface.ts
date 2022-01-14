import { MealOfTheDay } from './../../../domain/models/MealOfTheDay';

export abstract class IMealOfTheDayWriteRepository {
	/**
	 * Updates the meal planner in DB and returns it.
	 * @param mealOfTheDay MealOfTheDay to update
	 * @returns MealOfTheDay planner updated
	 */
	abstract update(mealOfTheDay: MealOfTheDay): Promise<MealOfTheDay>;
}
