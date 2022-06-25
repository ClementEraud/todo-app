import { IUserWriteRepository } from '../../../../application/ports/user/UserWriteRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/models/User';
import { UserSchema } from '../../mapper/UserSchema';

export class UserWriteRepository implements IUserWriteRepository {
	constructor(
		@InjectRepository(UserSchema)
		private userRepository: Repository<User>,
	) {}

	async create(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}

	async update(user: User): Promise<User> {
		await this.userRepository.update(
			{ id: user.id },
			{ firstName: user.firstName, lastName: user.lastName },
		);
		return user;
	}

	async delete(userId: string): Promise<boolean> {
		await this.userRepository.delete({ id: userId });
		return true;
	}
}
