import { User } from '../../../domain/models/User';

export abstract class IUserReadRepository {
	/**
	 * Returns all users in DB.
	 * @returns {Promise<User[]>}
	 */
	abstract findAll(): Promise<User[]>;

	/**
	 * Finds a user by its ID and returns it.
	 * @param {string} userId
	 * @returns {Promise<User>}
	 */
	abstract findById(userId: string): Promise<User>;

	/**
	 * Finds a user by username or die if no user or multiple users for this username.
	 * @param {string} username
	 * @returns {Promise<User>}
	 * @throws {UserNotFound}
	 */
	abstract findOneByUsernameOrDie(username: string): Promise<User>;
}
