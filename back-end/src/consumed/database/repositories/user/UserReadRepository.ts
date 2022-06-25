import { IUserReadRepository } from '../../../../application/ports/user/UserReadRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/models/User';
import { UserNotFound } from '../../../../domain/exceptions/UserNotFound';
import { UserSchema } from '../../mapper/UserSchema';

const relations = [
	'tasks',
	'mealPlanner',
	'mealPlanner.monday',
	'mealPlanner.tuesday',
	'mealPlanner.wednesday',
	'mealPlanner.thursday',
	'mealPlanner.friday',
	'mealPlanner.saturday',
	'mealPlanner.sunday',
];

export class UserReadRepository implements IUserReadRepository {
	constructor(
		@InjectRepository(UserSchema)
		private userRepository: Repository<User>,
	) {}

	async findAll(filters?: {
		username: string;
		firstName: string;
		lastName: string;
	}): Promise<User[]> {
		return await this.userRepository.find({
			relations,
			where: filters,
		});
	}

	async findById(userId: string): Promise<User> {
		return await this.userRepository.findOne({
			where: { id: userId },
			relations,
		});
	}

	async findByIdOrDie(userId: string): Promise<User> {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			relations,
		});

		if (!user) {
			throw new UserNotFound();
		}

		return user;
	}

	async findOneByUsernameOrDie(username: string): Promise<User> {
		try {
			const foundUsers = await this.userRepository.find({
				relations,
				where: { username },
			});
			if (foundUsers.length === 0 || foundUsers.length > 1) {
				throw new UserNotFound();
			}

			return foundUsers[0];
		} catch (err) {
			console.error(err);
			throw new UserNotFound();
		}
	}
}
