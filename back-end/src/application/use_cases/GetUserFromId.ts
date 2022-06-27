import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from './UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class GetUserFromId implements UseCase {
	constructor(private readonly userReadRepository: IUserReadRepository) {}

	async execute(userId: string): Promise<User> {
		const user = await this.userReadRepository.findByIdOrDie(userId);

		return user;
	}
}
