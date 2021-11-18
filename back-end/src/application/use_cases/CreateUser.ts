import { CreateUserDto } from '../command/create-user.dto';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class CreateUser implements UseCase {
	constructor(
		private readonly userWriteRepository: IUserWriteRepository,
		private readonly userReadRepository: IUserReadRepository,
	) {}

	async execute(createUser: CreateUserDto): Promise<User> {
		const userId = await this.userWriteRepository.insert(
			new User(createUser.firstName, createUser.lastName),
		);
		return this.userReadRepository.findOne(userId);
	}
}
