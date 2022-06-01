import { UserNotFound } from '../../../../domain/exceptions/UserNotFound';
/* eslint-disable sort-imports */
import { User } from '../../../../domain/models/User';
import { IUserReadRepository } from '../../../../application/ports/user/UserReadRepository.interface';

export class UserReadRepository implements IUserReadRepository {
	constructor(private userList: User[]) {}

	async findAll(filters?: Partial<User>): Promise<User[]> {
		return !filters
			? this.userList
			: this.userList.filter(user =>
					Object.keys(filters).every(key => filters[key] === user[key]),
			  );
	}

	async findById(userId: string): Promise<User> {
		return this.userList.find(user => user.id === userId);
	}

	async findByIdOrDie(userId: string): Promise<User> {
		const user = this.userList.find(user => user.id === userId);
		if (!user) {
			throw new UserNotFound();
		}

		return user;
	}

	async findOneByUsernameOrDie(username: string): Promise<User> {
		const foundUsers = this.userList.filter(user => user.username === username);
		if (foundUsers.length === 0 || foundUsers.length > 1) {
			throw new UserNotFound();
		}
		return foundUsers[0];
	}
}
