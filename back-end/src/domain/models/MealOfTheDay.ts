import { v4 as uuidv4 } from 'uuid';

export class MealOfTheDay {
	id: string;
	lunch: string;
	dinner: string;

	constructor(id?: string, lunch?: string, dinner?: string) {
		this.id = id ? id : uuidv4();
		this.lunch = lunch;
		this.dinner = dinner;
	}
}
