import { GetMealPlannerOfUser } from './../../src/application/use_cases/GetMealPlannerOfUser';
import { MealOfTheDay } from '../../src/domain/models/MealOfTheDay';
import { MealPlanner } from '../../src/domain/models/MealPlanner';

import { Task } from '../../src/domain/models/Task';
import { User } from '../../src/domain/models/User';
import { UserNotFound } from '../../src/domain/exceptions/UserNotFound';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';

describe('GetMealPlannerOfUser', () => {
	let useCase: GetMealPlannerOfUser;
	const userList: User[] = [
		new User(
			'Verna',
			'Tran',
			'username',
			'password',
			new MealPlanner(
				'3142403d-93cf-4efd-b167-515c98d387cc',
				new MealOfTheDay(
					'dfde59c0-a404-4834-896d-4ea565a9debe',
					'Soup',
					'Steak',
				),
			),
			[new Task('Title', 'Description')],
			'df15fecb-2baf-419f-858e-abae3ac1454b',
		),
	];

	beforeAll(async () => {
		useCase = new GetMealPlannerOfUser(new UserReadRepository(userList));
	});

	it('GIVEN a valid user ID SHOULD return the meal planner of user.', async () => {
		const mealPlanner = await useCase.execute(
			'df15fecb-2baf-419f-858e-abae3ac1454b',
		);
		expect(mealPlanner).toBeDefined();
		expect(mealPlanner.id).toBe('3142403d-93cf-4efd-b167-515c98d387cc');
	});

	it('GIVEN an unknown user ID SHOULD throw a UserNotFound error.', async () => {
		expect(
			useCase.execute('9967ba20-e5bc-4d65-bdac-b95eaee3b34a'),
		).rejects.toBeInstanceOf(UserNotFound);
	});
});
