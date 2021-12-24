import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { MealPlanner } from './../../domain/models/MealPlanner';
import { UseCase } from './UseCase.interface';

@Injectable()
export class GetMealPlannerOfUser implements UseCase {
	constructor(private readonly userReadRepository: IUserReadRepository) {}

	async execute(userId: string): Promise<MealPlanner> {
		const user = await this.userReadRepository.findByIdOrDie(userId);

		return user.mealPlanner;
	}
}
