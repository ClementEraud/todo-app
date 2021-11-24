import { CreateUser } from '../../src/application/use_cases/CreateUser';
import { User } from '../../src/domain/models/User';
import { UserWriteRepository } from '../../src/infrastructure/in_memory/repositories/user/UserWriteRepository';

describe('CreateUser', () => {
	let createUser: CreateUser;
	const userList: User[] = [];

	beforeEach(async () => {
		createUser = new CreateUser(new UserWriteRepository(userList));
	});

	it('GIVEN a valid user SHOULD insert a new user and return it', async () => {
		const userCreated = await createUser.execute({
			firstName: 'Bernice',
			lastName: 'McDonald',
		});

		expect(userCreated.id).toBeDefined();
		expect(userCreated.firstName).toBe('Bernice');
		expect(userCreated.lastName).toBe('McDonald');
		expect(userList.length).toBe(1);
	});
});
