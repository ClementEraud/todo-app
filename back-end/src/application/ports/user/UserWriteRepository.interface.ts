import { User } from '../../../domain/models/User';

export abstract class IUserWriteRepository {
	/**
	 * Inserts the user in DB and return the id.
	 * @param user User to insert in db.
	 * @returns User inserted.
	 *  */
	abstract insert(user: User): Promise<User>;

	/**
	 * Updates the user in DB and return updated user.
	 * @param user User to update.
	 * @returns User updated.
	 */
	abstract update(user: User): Promise<User>;

	/**
	 * Deletes user.
	 * @param userId ID of user to delete.
	 * @returns true if user has been removed.
	 */
	abstract remove(userId: string): Promise<boolean>;
}
