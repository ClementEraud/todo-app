import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { IUserWriteRepository } from '../../../../application/ports/user/UserWriteRepository.interface';
import { InjectConnection } from '@nestjs/typeorm';
import { UpdateUserDto } from '../../../../application/command/update-user.dto';
import { User } from '../../../../domain/models/User';
import { UserSchema } from '../../mapper/UserSchema';

export class UserWriteRepository implements IUserWriteRepository {
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async insert(user: User): Promise<string> {
		const id = user.id;
		await this.manager.insert(UserSchema, user);
		return id;
	}

	async update(userId: string, updateUser: UpdateUserDto): Promise<string> {
		await this.manager.update(UserSchema, { id: userId }, updateUser);
		return userId;
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
