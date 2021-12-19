import { User } from '../../../domain/models/User';

export abstract class IUserWriteRepository {
	/**
	 * Inserts the user in DB.
	 * @param user User to insert in db.
	 * @returns User inserted.
	 *  */
	abstract create(user: User): Promise<User>;

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
	abstract delete(userId: string): Promise<boolean>;
}
