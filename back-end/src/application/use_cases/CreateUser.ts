import * as bcrypt from 'bcrypt';
import { CreateUserCommand } from '../command/create-user';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';
import { UsernameAlreadyUsed } from '../../domain/exceptions/UsernameAlreadyUsed';

@Injectable()
export class CreateUser implements UseCase {
	constructor(
		private readonly userWriteRepository: IUserWriteRepository,
		private readonly userReadRepository: IUserReadRepository,
	) {}

	async execute(createUser: CreateUserCommand): Promise<User> {
		const salt = await bcrypt.genSalt(10);
		const hash_password = await bcrypt.hash(createUser.password, salt);
		const usersWithSameUsernameFound = await this.userReadRepository.findAll({
			username: createUser.username,
		});

		if (usersWithSameUsernameFound.length !== 0) {
			throw new UsernameAlreadyUsed();
		}

		return await this.userWriteRepository.insert(
			new User(
				createUser.firstName,
				createUser.lastName,
				createUser.username,
				hash_password,
			),
		);
	}
}
