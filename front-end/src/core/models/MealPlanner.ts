import { MealOfTheDay } from './MealOfTheDay';

export class MealPlanner {
	monday!: MealOfTheDay;
	tuesday!: MealOfTheDay;
	wednesday!: MealOfTheDay;
	thursday!: MealOfTheDay;
	friday!: MealOfTheDay;
	saturday!: MealOfTheDay;
	sunday!: MealOfTheDay;
	[key: string]: MealOfTheDay | string;
}
