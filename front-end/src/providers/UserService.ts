import { ConfigProvider } from './ConfigProvider';
import { CreateUserCommand } from './../core/commands/CreateUserCommand';
import { IUserService } from '../core/ports/UserService.interface';
import { User } from '../core/models/User';

export class UserService implements IUserService {
	private currentUser: User | undefined;

	async login(
		username: string,
		password: string,
		rememberMe: boolean,
	): Promise<User> {
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

		if (rememberMe) {
			localStorage.setItem('user', JSON.stringify(this.currentUser));
		} else {
			sessionStorage.setItem('user', JSON.stringify(this.currentUser));
		}

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
		if (!this.currentUser) {
			if (sessionStorage.getItem('user')) {
				this.currentUser = JSON.parse(sessionStorage.getItem('user') as string);
			} else if (localStorage.getItem('user')) {
				this.currentUser = JSON.parse(localStorage.getItem('user') as string);
			}
		}

		return this.currentUser;
	}

	logout(): void {
		this.currentUser = undefined;
		sessionStorage.removeItem('user');
		localStorage.removeItem('user');
	}
}
