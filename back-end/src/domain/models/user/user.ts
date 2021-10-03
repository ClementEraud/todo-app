import { Task } from '../task/task';

export class User {
	id: number;
	firstName: string;
	lastName: string;
	tasks: Task[];

	constructor(
		firstName: string,
		lastName: string,
		id?: number,
		tasks?: Task[],
	) {
		this.id = id;
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
}
