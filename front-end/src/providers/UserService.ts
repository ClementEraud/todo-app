import { ConfigProvider } from './ConfigProvider';
import { CreateUserCommand } from './../core/commands/CreateUserCommand';
import { IUserService } from '../core/ports/UserService.interface';
import { MealPlanner } from './../core/models/MealPlanner';
import { User } from '../core/models/User';

/* class decorator */
function staticImplements<T>() {
	return <U extends T>(constructor: U) => {constructor};
}
@staticImplements<IUserService>()
export class UserService {

	static async login(
		username: string,
		password: string,
		rememberMe: boolean,
	): Promise<string> {
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
			const responseJson = await response.json()
			throw new Error(responseJson.message);
		}

		const token = await response.text();

		if (rememberMe) {
			localStorage.setItem('token', token);
		} else {
			sessionStorage.setItem('token', token);
		}

		return token;
	}

	static async getCurrentUser(token: string): Promise<User> {
		const config = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${config.API_HOSTNAME}:${config.API_PORT}/users/me`,
			{
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				},
			},
		);
		const responseJson = await response.json()

		if(!response.ok) {
			throw new Error(responseJson.message)
		}

		return new User(responseJson)
	}

	static async signUp(user: CreateUserCommand): Promise<User> {
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

	static logout(): void {
		sessionStorage.removeItem('token');
		localStorage.removeItem('token');
	}

	static async getMealPlanner(token: string): Promise<MealPlanner> {
		const config = await ConfigProvider.getConfig();

		const response = await fetch(
			`http://${config.API_HOSTNAME}:${config.API_PORT}/users/me/get-meal-planner`,
			{
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				},
			},
		);

		const responseBody = await response.json();

		if (!response.ok) {
			throw new Error(responseBody.message);
		}

		return responseBody as MealPlanner;
	}
}
