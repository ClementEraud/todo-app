import { MealOfTheDay } from './MealOfTheDay';
import { v4 as uuidv4 } from 'uuid';

export class MealPlanner {
	id: string;
	monday: MealOfTheDay;
	tuesday: MealOfTheDay;
	wednesday: MealOfTheDay;
	thursday: MealOfTheDay;
	friday: MealOfTheDay;
	saturday: MealOfTheDay;
	sunday: MealOfTheDay;

	constructor() {
		this.id = uuidv4();
		this.monday = new MealOfTheDay();
		this.tuesday = new MealOfTheDay();
		this.wednesday = new MealOfTheDay();
		this.thursday = new MealOfTheDay();
		this.friday = new MealOfTheDay();
		this.saturday = new MealOfTheDay();
		this.sunday = new MealOfTheDay();
	}
}
