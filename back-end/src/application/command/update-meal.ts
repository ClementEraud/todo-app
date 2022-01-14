import { Day, LunchOrDinner } from './../../domain/models/MealPlanner';

export interface UpdateMealCommand {
	userId: string;
	day: Day;
	lunchOrDinner: LunchOrDinner;
	meal: string;
}
