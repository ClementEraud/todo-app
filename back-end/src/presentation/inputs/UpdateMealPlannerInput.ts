import { Day, LunchOrDinner } from '../../domain/models/MealPlanner';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateMealCommand } from './../../application/command/update-meal';

export class UpdateMealPlannerInput implements UpdateMealCommand {
	@ApiProperty({
		description: 'User ID.',
		required: true,
	})
	userId: string;

	@ApiProperty({
		description: 'Day of the meal to update.',
		required: true,
		enum: [
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
			'sunday',
		],
	})
	day: Day;

	@ApiProperty({
		description: 'Lunch or dinner to update.',
		required: true,
		enum: ['lunch', 'dinner'],
	})
	lunchOrDinner: LunchOrDinner;

	@ApiProperty({
		description: 'Meal you want for this day and lunch or dinner.',
		required: true,
	})
	meal: string;
}
