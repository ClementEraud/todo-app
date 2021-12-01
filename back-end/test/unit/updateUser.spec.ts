import { UpdateUser } from '../../src/application/use_cases/UpdateUser';
import { User } from '../../src/domain/models/User';
import { UserReadRepository } from '../../src/infrastructure/in_memory/repositories/user/UserReadRepository';
import { UserWriteRepository } from '../../src/infrastructure/in_memory/repositories/user/UserWriteRepository';

describe('UpdateUser', () => {
	let useCase: UpdateUser;
	const userList: User[] = [
		new User(
			'Verna',
			'Tran',
			'username',
			'password',
			[],
			'df15fecb-2baf-419f-858e-abae3ac1454b',
		),
	];

	beforeAll(async () => {
		useCase = new UpdateUser(
			new UserReadRepository(userList),
			new UserWriteRepository(userList),
		);
	});

	it('GIVEN a valid user SHOULD insert a new user and return it', async () => {
		const userUpdated = await useCase.execute(
			'df15fecb-2baf-419f-858e-abae3ac1454b',
			{
				firstName: 'Bernice',
				lastName: 'McDonald',
			},
		);

		expect(userUpdated.id).toBe('df15fecb-2baf-419f-858e-abae3ac1454b');
		expect(userUpdated.firstName).toBe('Bernice');
		expect(userUpdated.lastName).toBe('McDonald');
	});
});
