import { CreateUserCommand } from '../command/create-user';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class CreateUser implements UseCase {
	constructor(private readonly userWriteRepository: IUserWriteRepository) {}

	async execute(createUser: CreateUserCommand): Promise<User> {
		return await this.userWriteRepository.insert(
			new User(createUser.firstName, createUser.lastName),
		);
	}
}
