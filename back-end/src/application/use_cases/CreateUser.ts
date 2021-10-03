import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/User';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class CreateUser implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(createUser: CreateUserDto): Promise<User> {
		return this.userRepository.insert(createUser);
	}
}
