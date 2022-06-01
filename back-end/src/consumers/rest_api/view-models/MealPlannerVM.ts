import { ApiProperty } from '@nestjs/swagger';
import { MealOfTheDayVM } from './MealOfTheDayVM';
import { MealPlanner } from '../../../domain/models/MealPlanner';

export class MealPlannerVM {
	@ApiProperty({
		description: 'Meals of monday.',
		example: "{lunch: '', dinner: ''}",
	})
	monday: MealOfTheDayVM;
	@ApiProperty({
		description: 'Meals of tuesday.',
		example: "{lunch: '', dinner: ''}",
	})
	tuesday: MealOfTheDayVM;
	@ApiProperty({
		description: 'Meals of wednesday.',
		example: "{lunch: '', dinner: ''}",
	})
	wednesday: MealOfTheDayVM;
	@ApiProperty({
		description: 'Meals of thursday.',
		example: "{lunch: '', dinner: ''}",
	})
	thursday: MealOfTheDayVM;
	@ApiProperty({
		description: 'Meals of friday.',
		example: "{lunch: '', dinner: ''}",
	})
	friday: MealOfTheDayVM;
	@ApiProperty({
		description: 'Meals of saturday.',
		example: "{lunch: '', dinner: ''}",
	})
	saturday: MealOfTheDayVM;
	@ApiProperty({
		description: 'Meals of sunday.',
		example: "{lunch: '', dinner: ''}",
	})
	sunday: MealOfTheDayVM;

	constructor(mealPlanner: MealPlanner) {
		this.monday = new MealOfTheDayVM(mealPlanner.monday);
		this.tuesday = new MealOfTheDayVM(mealPlanner.tuesday);
		this.wednesday = new MealOfTheDayVM(mealPlanner.wednesday);
		this.thursday = new MealOfTheDayVM(mealPlanner.thursday);
		this.friday = new MealOfTheDayVM(mealPlanner.friday);
		this.saturday = new MealOfTheDayVM(mealPlanner.saturday);
		this.sunday = new MealOfTheDayVM(mealPlanner.sunday);
	}
}
