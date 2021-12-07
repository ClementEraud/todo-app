import { Task } from './Task';
import { v4 as uuidv4 } from 'uuid';

export class User {
	id: string;
	firstName: string;
	lastName: string;
	tasks: Task[];
	username: string;
	password: string;

	constructor(
		firstName: string,
		lastName: string,
		username: string,
		password: string,
		tasks?: Task[],
		id?: string,
	) {
		this.id = id ? id : uuidv4();
		this.firstName = firstName;
		this.lastName = lastName;
		this.tasks = tasks;
		this.username = username;
		this.password = password;
	}

	addTask(task: Task) {
		if (this.tasks) {
			this.tasks.push(task);
		} else {
			this.tasks = [task];
		}
	}
}
