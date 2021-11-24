import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';

export class User {
	id: string;
	firstName: string;
	lastName: string;
	tasks: Task[];

	constructor(
		firstName: string,
		lastName: string,
		tasks?: Task[],
		id?: string,
	) {
		this.id = id ? id : uuidv4();
		this.firstName = firstName;
		this.lastName = lastName;
		this.tasks = tasks;
	}

	addTask(task: Task) {
		if (this.tasks) {
			this.tasks.push(task);
		} else {
			this.tasks = [task];
		}
	}

	update(firstName?: string, lastName?: string) {
		if (firstName) {
			this.firstName = firstName;
		}

		if (lastName) {
			this.lastName = lastName;
		}
	}
}
