import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { IUserWriteRepository } from '../../../../application/ports/user/UserWriteRepository.interface';
import { InjectConnection } from '@nestjs/typeorm';
import { User } from '../../../../domain/models/User';
import { UserSchema } from '../../mapper/UserSchema';

export class UserWriteRepository implements IUserWriteRepository {
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async create(user: User): Promise<User> {
		return await this.manager.save(UserSchema, user);
	}

	async update(user: User): Promise<User> {
		await this.manager.update(
			UserSchema,
			{ id: user.id },
			{ firstName: user.firstName, lastName: user.lastName },
		);
		return user;
	}

	async delete(userId: string): Promise<boolean> {
		await this.manager.delete(UserSchema, { id: userId });
		return true;
	}
}
