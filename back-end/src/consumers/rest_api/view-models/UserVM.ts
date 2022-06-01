import { ApiProperty } from '@nestjs/swagger';
import { MealPlannerVM } from './MealPlannerVM';
import { TaskVM } from './TaskVM';
import { User } from '../../../domain/models/User';

export class UserVM {
	@ApiProperty({
		description: 'ID of user.',
		example: 1,
	})
	id: string;

	@ApiProperty({
		description: 'First name of user.',
		example: 'Barry',
	})
	firstName: string;

	@ApiProperty({
		description: 'Last name of user.',
		example: 'West',
	})
	lastName: string;

	@ApiProperty({
		description: 'Username of user.',
		example: 'AwesomeBarryWest',
	})
	username: string;

	@ApiProperty({
		description: 'Meal Planner of user.',
		example: `{
      monday : {lunch: '', dinner: ''},
      tuesday: {lunch: '', dinner: ''},
      wednesday: {lunch: '', dinner: ''},
      thursday: {lunch: '', dinner: ''},
      friday: {lunch: '', dinner: ''},
      saturday: {lunch: '', dinner: ''},
      sunday: {lunch: '', dinner: ''},
    }`,
	})
	mealPlanner: MealPlannerVM;

	@ApiProperty({
		description: 'Tasks of user.',
		example: `[
      {id: 1, title: 'Title', description: 'Description of task 1'},
      {id: 2, title: 'Title2', description: 'Description of task 2'},
      {id: 3, title: 'Title3', description: 'Description of task 3'},
    ]`,
	})
	tasks?: TaskVM[];

	constructor(user: User) {
		this.id = user.id;
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.username = user.username;
		this.mealPlanner = new MealPlannerVM(user.mealPlanner);
		this.tasks = user.tasks ? user.tasks.map(task => new TaskVM(task)) : [];
	}
}
