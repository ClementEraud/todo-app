import { ApiError } from './ApiError';
import { ConfigProvider } from './ConfigProvider';
import { CreateUserCommand } from './../core/commands/CreateUserCommand';
import { IUserService } from '../core/ports/UserService.interface';
import { User } from '../core/models/User';

export class UserService implements IUserService {
	async login(username: string, password: string): Promise<string> {
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

		if (!response.ok) {
			const error = (await response.json()) as ApiError;
			throw error;
		}

		return await response.text();
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

		return new User(responseBody);
	}

	async getCurrentUser(token?: string): Promise<User> {
		const { API_HOSTNAME, API_PORT } = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${API_HOSTNAME}:${API_PORT}/users/me`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		const responseBody = await response.json();

		if (!response.ok) {
			throw new Error(responseBody.message);
		}

		return responseBody as User;
	}
}
