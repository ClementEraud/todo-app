import { IUserRepository } from '../ports/UsersRepository.interface';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class UpdateUser implements UseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(id: number, updateUser: UpdateUserDto): Promise<User> {
		return this.userRepository.update(id, updateUser);
	}
}
