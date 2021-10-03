import { Injectable } from '@nestjs/common';
import { User } from '../../domain/models/User';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../ports/UsersRepository.interface';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class UpdateUser implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: number, updateUser: UpdateUserDto): Promise<User> {
		return this.userRepository.update(id, updateUser);
	}
}
