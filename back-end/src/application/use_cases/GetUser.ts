import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class GetUser implements UseCase {
	constructor(private readonly userReadRepository: IUserReadRepository) {}

	async execute(userId: string): Promise<User> {
		return this.userReadRepository.findById(userId);
	}
}
