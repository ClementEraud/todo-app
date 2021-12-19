import { BadPassword } from '../../src/domain/exceptions/BadPassword';
import { EncryptionServiceFake } from '../fakes/EncryptionServiceStubs';
import { LoginUser } from '../../src/application/use_cases/LoginUser';
import { MealPlanner } from './../../src/domain/models/MealPlanner';
import { Task } from '../../src/domain/models/Task';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';

describe('LoginUser', () => {
	let useCase: LoginUser;
	const userList: User[] = [
		new User(
			'Verna',
			'Tran',
			'username',
			'password',
			new MealPlanner(),
			[new Task('Title', 'Description')],
			'df15fecb-2baf-419f-858e-abae3ac1454b',
		),
	];

	beforeAll(() => {
		useCase = new LoginUser(
			new UserReadRepository(userList),
			new EncryptionServiceFake(),
		);
	});

	it('GIVEN a valid username and password SHOULD return the user', async () => {
		const user = await useCase.execute('username', 'password');
		expect(user.firstName).toBe('Verna');
		expect(user.lastName).toBe('Tran');
		expect(user.tasks.length).toBe(1);
		expect(user.mealPlanner).toBeDefined();
	});

	it('GIVEN a wrong password SHOULD throw a BadPassword Error', async () => {
		await expect(
			useCase.execute('username', 'bad_password'),
		).rejects.toBeInstanceOf(BadPassword);
	});
});
