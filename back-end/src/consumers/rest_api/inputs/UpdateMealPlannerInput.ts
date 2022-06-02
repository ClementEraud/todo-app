import { Day, LunchOrDinner } from '../../../domain/models/MealPlanner';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMealPlannerInput {
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
