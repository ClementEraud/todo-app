import { DayOfTheWeek } from './../types/DayOfTheWeek';
import { IMealPlannerService } from '../ports/MealPlannerService.interface';
import { LunchOrDinner } from './../types/LunchOrDinner';
import { MealPlanner } from './../models/MealPlanner';
import { UserService } from './../../providers/UserService';

export const useUpdateMealPlanner =
	(mealPlannerService: IMealPlannerService, userService: UserService) =>
	(
		onComplete?: (mealPlanner?: MealPlanner) => void,
		onError?: (err?: Error) => void,
	) => {
		const updateMealPlanner = ({
			day,
			lunchOrDinner,
			meal,
		}: {
			day: DayOfTheWeek;
			lunchOrDinner: LunchOrDinner;
			meal: string;
		}) => {
			const user = userService.getCurrentUser();

			return mealPlannerService
				.update({
					userId: user ? user.id : '',
					day,
					lunchOrDinner,
					meal,
				})
				.then(onComplete)
				.catch(onError);
		};

		return [updateMealPlanner];
	};
