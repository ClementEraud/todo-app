/* eslint-disable sort-imports */
import { User } from '../../../../domain/models/User';
import { IUserReadRepository } from '../../../../application/ports/user/UserReadRepository.interface';

export class UserReadRepository implements IUserReadRepository {
	constructor(private userList: User[]) {}

	async findAll(): Promise<User[]> {
		return this.userList;
	}

	async findOne(userId: string): Promise<User> {
		return this.userList.find((user) => user.id === userId);
	}
}
