import { BadPassword } from '../../domain/exceptions/BadPassword';
import { IEncryptionService } from '../ports/services/EncryptionService';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';

@Injectable()
export class LoginUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly encryptionService: IEncryptionService,
	) {}

	async execute(username: string, password: string): Promise<User> {
		const userFound = await this.userReadRepository.findOneByUsernameOrDie(
			username,
		);
		console.log(
			'🚀 ~ file: LoginUser.ts ~ line 19 ~ LoginUser ~ execute ~ userFound',
			userFound,
		);

		if (!this.encryptionService.compare(password, userFound.password)) {
			throw new BadPassword();
		}

		return userFound;
	}
}
