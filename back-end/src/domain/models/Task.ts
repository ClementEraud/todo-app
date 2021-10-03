import { User } from './User';

export class Task {
	id: number;
	title: string;
	description: string;
	user: User;

	constructor(id: number, title: string, description: string, user?: User) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.user = user;
	}
}
