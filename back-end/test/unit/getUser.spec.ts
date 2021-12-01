import { GetUser } from '../../src/application/use_cases/GetUser';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';

describe('GetUser', () => {
	let useCase: GetUser;
	const userList: User[] = [
		new User(
			'Verna',
			'Tran',
			'username',
			'password',
			[],
			'df15fecb-2baf-419f-858e-abae3ac1454b',
		),
		new User(
			'Susan',
			'Willis',
			'username',
			'password',
			[],
			'a8e249fa-e38c-47b8-8439-c3fa51e0f118',
		),
	];

	beforeAll(async () => {
		useCase = new GetUser(new UserReadRepository(userList));
	});

	it('GIVEN a valid ID SHOULD return matching user', async () => {
		const user = await useCase.execute('df15fecb-2baf-419f-858e-abae3ac1454b');

		expect(user.id).toBe('df15fecb-2baf-419f-858e-abae3ac1454b');
		expect(user.firstName).toBe('Verna');
		expect(user.lastName).toBe('Tran');
	});
});
