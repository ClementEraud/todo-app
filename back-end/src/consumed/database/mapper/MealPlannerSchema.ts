import { EntitySchema } from 'typeorm';
import { MealOfTheDay } from '../../../domain/models/MealOfTheDay';
import { MealPlanner } from '../../../domain/models/MealPlanner';

export const MealPlannerSchema = new EntitySchema<MealPlanner>({
	name: 'MealPlanner',
	target: MealPlanner,
	columns: {
		id: {
			type: String,
			primary: true,
		},
	},
	relations: {
		monday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
		tuesday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
		wednesday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
		thursday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
		friday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
		saturday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
		sunday: {
			type: 'one-to-one',
			target: () => MealOfTheDay,
			cascade: ['insert', 'update'],
			onDelete: 'CASCADE',
			joinColumn: true,
			joinTable: true,
		},
	},
});
