import * as bcrypt from 'bcrypt';
import { BadPassword } from '../../domain/exceptions/BadPassword';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class LoginUser implements UseCase {
	constructor(private readonly userReadRepository: IUserReadRepository) {}

	async execute(username: string, password: string): Promise<User> {
		const userFound = await this.userReadRepository.findOneByUsernameOrDie(
			username,
		);

		if (!bcrypt.compareSync(password, userFound.password)) {
			throw new BadPassword();
		}

		return userFound;
	}
}
