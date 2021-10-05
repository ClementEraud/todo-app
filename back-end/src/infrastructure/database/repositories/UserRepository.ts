import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { IUserRepository } from '../../../application/ports/UsersRepository.interface';
import { InjectConnection } from '@nestjs/typeorm';
import { UpdateUserDto } from '../../../application/dto/update-user.dto';
import { User } from '../../../domain/models/User';
import { UserSchema } from '../mapper/UserSchema';

export class UserRepository implements IUserRepository {
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async insert(user: User): Promise<User> {
		const id = user.id;
		await this.manager.insert(UserSchema, user);
		return this.findOne(id);
	}

	async findAll(): Promise<User[]> {
		return await this.manager.find(UserSchema, { relations: ['tasks'] });
	}

	async findOne(userId: string): Promise<User> {
		return await this.manager.findOne(UserSchema, userId, {
			relations: ['tasks'],
		});
	}

	async update(userId: string, updateUser: UpdateUserDto): Promise<User> {
		await this.manager.update(UserSchema, { id: userId }, updateUser);
		return this.findOne(userId);
	}

	async remove(userId: string): Promise<boolean> {
		try {
			await this.manager.delete(UserSchema, { id: userId });
		} catch {
			return false;
		}

		return true;
	}

	async save(user: User): Promise<User> {
		return this.manager.save(user);
	}
}
