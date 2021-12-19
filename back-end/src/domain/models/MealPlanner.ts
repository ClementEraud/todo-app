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

	constructor(
		id?: string,
		monday?: MealOfTheDay,
		tuesday?: MealOfTheDay,
		wednesday?: MealOfTheDay,
		thursday?: MealOfTheDay,
		friday?: MealOfTheDay,
		saturday?: MealOfTheDay,
		sunday?: MealOfTheDay,
	) {
		this.id = id ? id : uuidv4();
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
		this.sunday = sunday;
	}
}
