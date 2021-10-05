import { User } from './User';
import { v4 as uuidv4 } from 'uuid';

export class Task {
	id: string;
	title: string;
	description: string;
	user?: User;

	constructor(title: string, description: string, id?: string, user?: User) {
		this.id = id ? id : uuidv4();
		this.title = title;
		this.description = description;
		this.user = user;
	}
}
