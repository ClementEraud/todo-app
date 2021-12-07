import { IUserService } from '../core/ports/UserService.interface';
import { User } from '../core/models/User';

export class UserService implements IUserService {
	private currentUser: User | undefined;

	async login(username: string, password: string): Promise<User> {
		const response = await fetch('http://localhost:3001/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		});

		const responseBody = await response.json();

		if (!response.ok) {
			throw new Error(responseBody.message);
		}

		this.currentUser = new User(responseBody);
		return this.currentUser;
	}

	getCurrentUser(): User | undefined {
		return this.currentUser;
	}
}
