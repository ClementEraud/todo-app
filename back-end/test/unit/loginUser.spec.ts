import { BadPassword } from '../../src/domain/exceptions/BadPassword';
import { CreateUser } from '../../src/application/use_cases/CreateUser';
import { LoginUser } from '../../src/application/use_cases/LoginUser';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';
import { UserWriteRepository } from '../../src/infrastructure/in_memory/repositories/user/UserWriteRepository';

describe('LoginUser', () => {
	let useCase: LoginUser;
	let createUser: CreateUser;
	const userList: User[] = [];

	beforeAll(async () => {
		useCase = new LoginUser(new UserReadRepository(userList));
		createUser = new CreateUser(new UserWriteRepository(userList));

		await createUser.execute({
			firstName: 'Bernice',
			lastName: 'McDonald',
			username: 'McDoDu44',
			password: 'password',
		});
	});

	it('GIVEN a valid username and password SHOULD return the user', async () => {
		const user = await useCase.execute('McDoDu44', 'password');
		expect(user.firstName).toBe('Bernice');
		expect(user.lastName).toBe('McDonald');
	});

	it('GIVEN a wrong password SHOULD throw a BadPassword Error', async () => {
		await expect(
			useCase.execute('McDoDu44', 'bad_password'),
		).rejects.toBeInstanceOf(BadPassword);
	});
});
