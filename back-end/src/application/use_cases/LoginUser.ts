import { BadPassword } from '../../domain/exceptions/BadPassword';
import { IEncryptionService } from '../ports/services/EncryptionService';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UseCase } from '../use_cases/UseCase.interface';

@Injectable()
export class LoginUser implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly encryptionService: IEncryptionService,
		private readonly jwtService: JwtService,
	) {}

	async execute(username: string, password: string): Promise<string> {
		try {
			const userFound = await this.userReadRepository.findOneByUsernameOrDie(
				username,
			);

			if (!this.encryptionService.compare(password, userFound.password)) {
				throw new BadPassword();
			}

			return this.jwtService.sign({
				userId: userFound.id,
				username: userFound.username,
			});
		} catch (err) {
			console.error(err);
			throw err;
		}
	}
}
