import { MealOfTheDay } from './MealOfTheDay';
import { v4 as uuidv4 } from 'uuid';

export type Day =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday';

export type LunchOrDinner = 'lunch' | 'dinner';

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
		this.monday = monday ? monday : new MealOfTheDay();
		this.tuesday = tuesday ? tuesday : new MealOfTheDay();
		this.wednesday = wednesday ? wednesday : new MealOfTheDay();
		this.thursday = thursday ? thursday : new MealOfTheDay();
		this.friday = friday ? friday : new MealOfTheDay();
		this.saturday = saturday ? saturday : new MealOfTheDay();
		this.sunday = sunday ? sunday : new MealOfTheDay();
	}

	public updateMeal(day: Day, lunchOrDinner: LunchOrDinner, meal: string) {
		this[day][lunchOrDinner] = meal;
	}
}
