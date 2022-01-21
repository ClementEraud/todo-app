import { DayOfTheWeek } from './../types/DayOfTheWeek';
import { LunchOrDinner } from './../types/LunchOrDinner';

export interface UpdateMealPlannerCommand {
	userId: string;
	day: DayOfTheWeek;
	lunchOrDinner: LunchOrDinner;
	meal: string;
}
