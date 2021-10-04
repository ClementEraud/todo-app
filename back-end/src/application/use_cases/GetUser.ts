import { IUserRepository } from '../ports/UsersRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class GetUser implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(userId: number): Promise<User> {
		return this.userRepository.findOne(userId);
	}
}
