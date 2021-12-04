import * as bcrypt from 'bcrypt';
import { CreateUser } from '../../src/application/use_cases/CreateUser';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';
import { UserWriteRepository } from '../../src/infrastructure/in_memory/repositories/user/UserWriteRepository';
import { UsernameAlreadyUsed } from '../../src/domain/exceptions/UsernameAlreadyUsed';

describe('CreateUser', () => {
	let useCase: CreateUser;
	const userList: User[] = [];

	beforeAll(async () => {
		useCase = new CreateUser(
			new UserWriteRepository(userList),
			new UserReadRepository(userList),
		);
	});

	it('GIVEN a valid user SHOULD insert a new user and return it.', async () => {
		const userCreated = await useCase.execute({
			firstName: 'Bernice',
			lastName: 'McDonald',
			username: 'McDoDu44',
			password: 'password',
		});

		expect(userCreated.id).toBeDefined();
		expect(userCreated.firstName).toBe('Bernice');
		expect(userCreated.lastName).toBe('McDonald');
		expect(userCreated.username).toBe('McDoDu44');
		expect(await bcrypt.compare('password', userCreated.password)).toBe(true);
		expect(userList.length).toBe(1);
	});

	it('GIVEN a username already used SHOULD throw UsernameAlreadyUsed error.', async () => {
		await expect(
			useCase.execute({
				firstName: 'Bernice',
				lastName: 'McDonald',
				username: 'McDoDu44',
				password: 'password',
			}),
		).rejects.toBeInstanceOf(UsernameAlreadyUsed);
	});
});
