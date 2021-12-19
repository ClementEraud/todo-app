import { ApiProperty } from '@nestjs/swagger';
import { MealOfTheDay } from './../../domain/models/MealOfTheDay';

export class MealOfTheDayVM {
	@ApiProperty({
		description: 'Lunch of the day',
		example: 'Pasta',
	})
	lunch: string;
	@ApiProperty({
		description: 'Lunch of the day',
		example: 'Lasagna',
	})
	dinner: string;

	constructor(mealOfTheDay: MealOfTheDay) {
		this.lunch = mealOfTheDay.lunch;
		this.dinner = mealOfTheDay.dinner;
	}
}
