import { CreateUserCommand } from './../commands/CreateUserCommand';
import { MealPlanner } from './../models/MealPlanner';
import { User } from '../models/User';

export interface IUserService {
	/**
	 * Returns current user.
	 * @returns {Promise<User>} User connected.
	 */
	getCurrentUser(token: string): Promise<User>;

	/**
	 * Calls login endpoint of API.
	 * @param {string} username
	 * @param {string} password
	 * @param {boolean} rememberMe
	 * @returns {Promise<User>} Connected user.
	 * @throws Error if username or password is wrong.
	 */
	login(
		username: string,
		password: string,
		rememberMe: boolean,
	): Promise<string>;

	/**
	 * Calls sign-up endpoint of API.
	 * @param {CreateUserCommand} user User to create
	 * @returns {Promise<User>} User created.
	 */
	signUp(user: CreateUserCommand): Promise<User>;

	/**
	 * Logs-out user and deletes user from WebStorage.
	 */
	logout(): void;

	/**
	 * Get Meal Planner from API.
	 */
	getMealPlanner(token: string): Promise<MealPlanner>;
}
