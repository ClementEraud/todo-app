import { IMealOfTheDayWriteRepository } from '../../../../application/ports/mealOfTheDay/MealOfTheDayWriteRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { MealOfTheDay } from '../../../../domain/models/MealOfTheDay';
import { MealOfTheDaySchema } from '../../mapper/MealOfTheDaySchema';
import { Repository } from 'typeorm';

export class MealOfTheDayWriteRepository
	implements IMealOfTheDayWriteRepository
{
	constructor(
		@InjectRepository(MealOfTheDaySchema)
		private mealOfTheDayRepository: Repository<MealOfTheDay>,
	) {}

	async update(mealOfTheDay: MealOfTheDay): Promise<MealOfTheDay> {
		await this.mealOfTheDayRepository.update(
			{ id: mealOfTheDay.id },
			mealOfTheDay,
		);
		return mealOfTheDay;
	}
}
