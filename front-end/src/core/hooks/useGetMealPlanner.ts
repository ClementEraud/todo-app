import { useEffect, useState } from 'react';
import { IUserService } from '../ports/UserService.interface';
import { MealPlanner } from '../models/MealPlanner';

export const useGetMealPlanner =
	(userService: IUserService) =>
	(
		onResponse: (mealPlanner: MealPlanner) => void,
		onError: (err: Error) => void,
	) => {
		const [isLoading, setLoading] = useState(false);

		useEffect(() => {
			userService
				.getMealPlanner()
				.then((mealPlanner: MealPlanner) => {
					setLoading(false);
					onResponse(mealPlanner);
				})
				.catch((error: Error) => {
					setLoading(false);
					onError(error);
				});
		}, []);

		return { isLoading };
	};
