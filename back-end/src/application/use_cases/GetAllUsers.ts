import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class GetAllUsers implements UseCase {
	constructor(private readonly userReadRepository: IUserReadRepository) {}

	async execute(): Promise<User[]> {
		return this.userReadRepository.findAll();
	}
}
