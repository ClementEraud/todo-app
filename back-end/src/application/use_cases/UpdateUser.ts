import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UpdateUserCommand } from '../command/update-user';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class UpdateUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly userWriteRepository: IUserWriteRepository,
	) {}

	async execute(id: string, updateUser: UpdateUserCommand): Promise<User> {
		const user: User = await this.userReadRepository.findOne(id);
		user.update(updateUser.firstName, updateUser.lastName);
		return await this.userWriteRepository.update(user);
	}
}
