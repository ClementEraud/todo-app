export class User {
	id: string;
	firstName: string;
	lastName: string;
	username: string;
	tasks: [];

	constructor({ id, firstName, lastName, username, tasks }: User) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.tasks = tasks;
	}
}
