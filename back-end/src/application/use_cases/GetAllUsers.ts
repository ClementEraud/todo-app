import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/User';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class GetAllUsers implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(): Promise<User[]> {
		return this.userRepository.findAll();
	}
}
