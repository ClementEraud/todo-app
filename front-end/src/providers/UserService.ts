import { ConfigProvider } from './ConfigProvider';
import { CreateUserCommand } from './../core/commands/CreateUserCommand';
import { IUserService } from '../core/ports/UserService.interface';
import { User } from '../core/models/User';

export class UserService implements IUserService {
	private currentUser: User | undefined;

	async login(username: string, password: string): Promise<User> {
		const config = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${config.API_HOSTNAME}:${config.API_PORT}/users/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
			},
		);

		const responseBody = await response.json();

		if (!response.ok) {
			throw new Error(responseBody.message);
		}

		this.currentUser = new User(responseBody);
		return this.currentUser;
	}

	async signUp(user: CreateUserCommand): Promise<User> {
		const config = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${config.API_HOSTNAME}:${config.API_PORT}/users`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				body: JSON.stringify(user),
			},
		);

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
