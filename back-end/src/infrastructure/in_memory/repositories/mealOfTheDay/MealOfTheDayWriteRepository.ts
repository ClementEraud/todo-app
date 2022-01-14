import { IMealOfTheDayWriteRepository } from '../../../../application/ports/mealOfTheDay/MealOfTheDayWriteRepository.interface';
import { MealOfTheDay } from './../../../../domain/models/MealOfTheDay';

export class MealOfTheDayWriteRepository
	implements IMealOfTheDayWriteRepository
{
	async update(mealOfTheDay: MealOfTheDay): Promise<MealOfTheDay> {
		return mealOfTheDay;
	}
}
