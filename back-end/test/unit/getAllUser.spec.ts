import { GetAllUsers } from '../../src/application/use_cases/GetAllUsers';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';

describe('GetAllUser', () => {
	let useCase: GetAllUsers;
	const userList: User[] = [
		new User('Verna', 'Tran', [], 'df15fecb-2baf-419f-858e-abae3ac1454b'),
		new User('Susan', 'Willis', [], 'a8e249fa-e38c-47b8-8439-c3fa51e0f118'),
	];

	beforeAll(async () => {
		useCase = new GetAllUsers(new UserReadRepository(userList));
	});

	it('SHOULD return all users', async () => {
		const users = await useCase.execute();

		expect(users.length).toBe(2);

		expect(users[0].id).toBe('df15fecb-2baf-419f-858e-abae3ac1454b');
		expect(users[0].firstName).toBe('Verna');
		expect(users[0].lastName).toBe('Tran');

		expect(users[1].id).toBe('a8e249fa-e38c-47b8-8439-c3fa51e0f118');
		expect(users[1].firstName).toBe('Susan');
		expect(users[1].lastName).toBe('Willis');
	});
});
