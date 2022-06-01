import { MealOfTheDay } from '../../src/domain/models/MealOfTheDay';
import { MealOfTheDayWriteRepository } from '../../src/consumed/in_memory/repositories/mealOfTheDay/MealOfTheDayWriteRepository';
import { MealPlanner } from '../../src/domain/models/MealPlanner';
import { Task } from '../../src/domain/models/Task';
import { UpdateMeal } from '../../src/application/use_cases/UpdateMeal';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/consumed/in_memory/repositories/user/UserReadRepository';

describe('UpdateMeal', () => {
	let useCase: UpdateMeal;
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
		useCase = new UpdateMeal(
			new UserReadRepository(userList),
			new MealOfTheDayWriteRepository(),
		);
	});

	it('GIVEN valid params SHOULD update the meal of user.', async () => {
		const mealPlanner = await useCase.execute({
			userId: 'df15fecb-2baf-419f-858e-abae3ac1454b',
			day: 'monday',
			lunchOrDinner: 'lunch',
			meal: 'Fajitas',
		});
		expect(mealPlanner).toBeDefined();
		expect(mealPlanner.monday.lunch).toBe('Fajitas');
	});
});
