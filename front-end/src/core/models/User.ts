import { MealPlanner } from './MealPlanner';
import { Task } from './Task';

export class User {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	tasks: Task[];
	mealPlanner: MealPlanner;

	constructor({ id, firstName, lastName, username, tasks, mealPlanner }: User) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.tasks = tasks;
		this.mealPlanner = mealPlanner;
	}
}
