import { User } from './User';

export class Task {
	id: string;
	title: string;
	description: string;
	user?: User;

	constructor(id: string, title: string, description: string, user?: User) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.user = user;
	}
}
