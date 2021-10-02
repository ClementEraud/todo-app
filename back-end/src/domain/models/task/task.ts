import { User } from '../user/user';

export class Task {
    id: number;
    title: string;
    description: string;
    user: User;

    constructor(title: string, description: string, id?: number, user?: User) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
    }
}