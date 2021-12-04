import { IUserWriteRepository } from '../../../../application/ports/user/UserWriteRepository.interface';
import { User } from '../../../../domain/models/User';

export class UserWriteRepository implements IUserWriteRepository {
	constructor(private userList: User[]) {}

	async insert(user: User): Promise<User> {
		this.userList.push(user);
		return user;
	}

	async update(user: User): Promise<User> {
		this.userList = this.userList.reduce((acc, userInList) => {
			if (userInList.id == user.id) {
				return [...acc, user];
			}
			return [...acc, userInList];
		}, []);

		return user;
	}

	async remove(userId: string): Promise<boolean> {
		const idx = this.userList.findIndex(user => user.id === userId);
		this.userList.splice(idx);
		return true;
	}
}
