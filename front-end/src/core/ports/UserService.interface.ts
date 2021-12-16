import { CreateUserCommand } from './../commands/CreateUserCommand';
import { User } from '../models/User';

export abstract class IUserService {
	/**
	 * Returns current user.
	 * @returns {User | undefined} User or undefined if no user is connected.
	 */
	abstract getCurrentUser(): User | undefined;

	/**
	 * Calls login endpoint of API.
	 * @param {string} username
	 * @param {string} password
	 * @param {boolean} rememberMe
	 * @returns {Promise<User>} Connected user.
	 * @throws Error if username or password is wrong.
	 */
	abstract login(
		username: string,
		password: string,
		rememberMe: boolean,
	): Promise<User>;

	/**
	 * Calls sign-up endpoint of API.
	 * @param {CreateUserCommand} user User to create
	 * @returns {Promise<User>} User created.
	 */
	abstract signUp(user: CreateUserCommand): Promise<User>;

	/**
	 * Logs-out user and deletes user from WebStorage.
	 */
	abstract logout(): void;
}
