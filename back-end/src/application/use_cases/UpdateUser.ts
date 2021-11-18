import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../command/update-user.dto';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class UpdateUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly userWriteRepository: IUserWriteRepository,
	) {}

	async execute(id: string, updateUser: UpdateUserDto): Promise<User> {
		await this.userWriteRepository.update(id, updateUser);
		return await this.userReadRepository.findOne(id);
	}
}
