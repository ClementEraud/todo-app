import { IMealOfTheDayWriteRepository } from '../ports/mealOfTheDay/MealOfTheDayWriteRepository.interface';
import { IUserReadRepository } from '../ports/user/UserReadRepository.interface';
import { Injectable } from '@nestjs/common';
import { MealPlanner } from './../../domain/models/MealPlanner';
import { UpdateMealCommand } from './../command/update-meal';
import { UseCase } from './UseCase.interface';

@Injectable()
export class UpdateMeal implements UseCase {
	constructor(
		private readonly userReadRepository: IUserReadRepository,
		private readonly mealOfTheDayWriteRepository: IMealOfTheDayWriteRepository,
	) {}

	async execute({
		userId,
		day,
		lunchOrDinner,
		meal,
	}: UpdateMealCommand): Promise<MealPlanner> {
		const user = await this.userReadRepository.findByIdOrDie(userId);
		user.mealPlanner.updateMeal(day, lunchOrDinner, meal);
		await this.mealOfTheDayWriteRepository.update(user.mealPlanner[day]);
		return user.mealPlanner;
	}
}
