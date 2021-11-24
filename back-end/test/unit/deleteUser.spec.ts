import { DeleteUser } from '../../src/application/use_cases/DeleteUser';
import { User } from '../../src/domain/models/User';
import { UserWriteRepository } from '../../src/infrastructure/in_memory/repositories/user/UserWriteRepository';

describe('DeleteUser', () => {
	let deleteUser: DeleteUser;
	const userList: User[] = [
		new User('Marian', 'Thompson', [], '41482d04-68c9-46a9-8ab2-5d8daf6f2aaf'),
	];

	beforeEach(() => {
		deleteUser = new DeleteUser(new UserWriteRepository(userList));
	});

	it('GIVEN a valid ID SHOULD delete the user', async () => {
		const value = await deleteUser.execute(
			'41482d04-68c9-46a9-8ab2-5d8daf6f2aaf',
		);

		expect(value).toBe(true);
		expect(userList.length).toBe(0);
	});
});
