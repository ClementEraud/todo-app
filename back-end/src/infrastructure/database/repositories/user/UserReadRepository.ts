import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { IUserReadRepository } from '../../../../application/ports/user/UserReadRepository.interface';
import { InjectConnection } from '@nestjs/typeorm';
import { User } from '../../../../domain/models/User';
import { UserNotFound } from './../../../../domain/exceptions/UserNotFound';
import { UserSchema } from '../../mapper/UserSchema';

export class UserReadRepository implements IUserReadRepository {
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async findAll(filters?: Partial<User>): Promise<User[]> {
		return await this.manager.find(UserSchema, {
			relations: ['tasks', 'mealPlanner'],
			where: filters,
		});
	}

	async findById(userId: string): Promise<User> {
		return await this.manager.findOne(UserSchema, userId, {
			relations: ['tasks', 'mealPlanner'],
		});
	}

	async findOneByUsernameOrDie(username: string): Promise<User> {
		const foundUsers = await this.manager.find(UserSchema, {
			relations: ['tasks', 'mealPlanner'],
			where: { username },
		});

		if (foundUsers.length === 0 || foundUsers.length > 1) {
			throw new UserNotFound();
		}

		return foundUsers[0];
	}
}
