import { v4 as uuidv4 } from 'uuid';

export class MealOfTheDay {
	id: string;
	lunch: string;
	dinner: string;

	constructor() {
		this.id = uuidv4();
	}
}
