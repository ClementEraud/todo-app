import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common/decorators';
import { UseCase } from './UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class GetCurrentUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
	) {}

	async execute(userId: string): Promise<User> {
		try {
			return this.userReadRepository.findById(userId)
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
}
