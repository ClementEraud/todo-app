import { User } from '../core/models/User';

export class UserService {
	static async login(username: string, password: string): Promise<User> {
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

		return new User(responseBody);
	}
}
