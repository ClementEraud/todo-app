import { CreateUserCommand } from '../command/create-user';
import { IEncryptionService } from '../ports/services/EncryptionService';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { IUserWriteRepository } from '../ports/user/UserWriteRepository.interface';
import { Injectable } from '@nestjs/common';
import { MealPlanner } from './../../domain/models/MealPlanner';
import { UseCase } from '../use_cases/UseCase.interface';
import { User } from '../../domain/models/User';
import { UsernameAlreadyUsed } from '../../domain/exceptions/UsernameAlreadyUsed';

@Injectable()
export class CreateUser implements UseCase {
	constructor(
		private readonly userWriteRepository: IUserWriteRepository,
		private readonly userReadRepository: IUserReadRepository,
		private readonly encryptionService: IEncryptionService,
	) {}

	async execute(createUser: CreateUserCommand): Promise<User> {
		User.isValid(createUser);

		const hash_password = this.encryptionService.hash(createUser.password);
		const usersWithSameUsernameFound = await this.userReadRepository.findAll({
			username: createUser.username,
		});

		if (usersWithSameUsernameFound.length !== 0) {
			throw new UsernameAlreadyUsed();
		}

		try {
			const mealPlanner = new MealPlanner();
			const user = new User(
				createUser.firstName,
				createUser.lastName,
				createUser.username,
				hash_password,
				mealPlanner,
			);

			const userCreated = await this.userWriteRepository.create(user);
			return userCreated;
		} catch (e) {
			console.error(e);
		}
	}
}
