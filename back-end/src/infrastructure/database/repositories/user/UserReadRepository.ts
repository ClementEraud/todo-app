/* eslint-disable sort-imports */
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { User } from '../../../../domain/models/User';
import { UserSchema } from '../../mapper/UserSchema';
import { IUserReadRepository } from '../../../../application/ports/user/UserReadRepository.interface';

export class UserReadRepository implements IUserReadRepository {
	readonly manager: EntityManager;
	readonly queryRunner?: QueryRunner;

	constructor(@InjectConnection() connection: Connection) {
		this.queryRunner = connection.createQueryRunner();
		this.manager = this.queryRunner.manager;
	}

	async findAll(): Promise<User[]> {
		return await this.manager.find(UserSchema, { relations: ['tasks'] });
	}

	async findOne(userId: string): Promise<User> {
		return await this.manager.findOne(UserSchema, userId, {
			relations: ['tasks'],
		});
	}
}
