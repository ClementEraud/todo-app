import { ApiProperty } from '@nestjs/swagger';
import { MealPlannerVM } from './MealPlannerVM';
import { TaskVM } from './TaskVM';
import { User } from '../../domain/models/User';

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

	constructor(
		id: string,
		firstName: string,
		lastName: string,
		username: string,
		mealPlanner: MealPlannerVM,
		tasks?: TaskVM[],
	) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.tasks = tasks;
		this.mealPlanner = mealPlanner;
	}

	static toViewModel(user: User): UserVM {
		return new UserVM(
			user.id,
			user.firstName,
			user.lastName,
			user.username,
			user.mealPlanner,
			user.tasks ? user.tasks.map(TaskVM.toViewModel) : [],
		);
	}
}
