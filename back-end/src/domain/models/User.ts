import { Task } from './Task';

export class User {
	id: number;
	firstName: string;
	lastName: string;
	tasks: Task[];

	constructor(id: number, firstName: string, lastName: string, tasks?: Task[]) {
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
