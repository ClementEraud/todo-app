import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/user/user';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class GetUser implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(userId: number): Promise<User> {
		return this.userRepository.findOne(userId);
	}
}
