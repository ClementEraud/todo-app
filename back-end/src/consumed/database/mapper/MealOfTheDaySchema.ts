import { EntitySchema } from 'typeorm';
import { MealOfTheDay } from '../../../domain/models/MealOfTheDay';

export const MealOfTheDaySchema = new EntitySchema<MealOfTheDay>({
	name: 'MealOfTheDay',
	target: MealOfTheDay,
	columns: {
		id: {
			type: String,
			primary: true,
		},
		lunch: {
			type: String,
			nullable: true,
		},
		dinner: {
			type: String,
			nullable: true,
		},
	},
});
