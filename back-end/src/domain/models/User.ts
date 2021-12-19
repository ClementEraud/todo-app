import { MealPlanner } from './MealPlanner';
import { MissingRequiredProperties } from './../exceptions/MissingRequiredProperties';
import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';

export class User {
	id: string;
	firstName: string;
	lastName: string;
	tasks: Task[];
	username: string;
	password: string;
	mealPlanner: MealPlanner;

	constructor(
		firstName: string,
		lastName: string,
		username: string,
		password: string,
		mealPlanner?: MealPlanner,
		tasks?: Task[],
		id?: string,
	) {
		this.id = id ? id : uuidv4();
		this.firstName = firstName;
		this.lastName = lastName;
		this.tasks = tasks;
		this.username = username;
		this.password = password;
		this.mealPlanner = mealPlanner ? mealPlanner : new MealPlanner();
	}

	addTask(task: Task) {
		if (this.tasks) {
			this.tasks.push(task);
		} else {
			this.tasks = [task];
		}
	}

	static isValid(user: {
		username: string;
		password: string;
		firstName: string;
		lastName: string;
	}) {
		const requiredProps = ['firstName', 'lastName', 'username', 'password'];
		const missingProps = requiredProps.filter(prop => !user[prop]);

		if (missingProps.length) {
			throw new MissingRequiredProperties(missingProps);
		}

		return true;
	}
}
