import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class CreateUser implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(createUser: CreateUserDto): Promise<User> {
		return this.userRepository.insert(
			new User(createUser.firstName, createUser.lastName),
		);
	}
}
