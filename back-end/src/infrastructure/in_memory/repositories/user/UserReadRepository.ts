import { UserNotFound } from './../../../../domain/exceptions/UserNotFound';
/* eslint-disable sort-imports */
import { User } from '../../../../domain/models/User';
import { IUserReadRepository } from '../../../../application/ports/user/UserReadRepository.interface';

export class UserReadRepository implements IUserReadRepository {
	constructor(private userList: User[]) {}

	async findAll(): Promise<User[]> {
		return this.userList;
	}

	async findById(userId: string): Promise<User> {
		return this.userList.find((user) => user.id === userId);
	}

	async findOneByUsernameOrDie(username: string): Promise<User> {
		const foundUsers = this.userList.filter(
			(user) => user.username === username,
		);
		if (foundUsers.length === 0 || foundUsers.length > 1) {
			throw new UserNotFound();
		}
		return foundUsers[0];
	}
}
