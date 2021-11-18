import { UpdateUserDto } from '../../command/update-user.dto';
import { User } from '../../../domain/models/User';

export abstract class IUserWriteRepository {
	// Insert the user in DB and return the id
	abstract insert(user: User): Promise<string>;
	abstract update(
		userId: string,
		updateUserDto: UpdateUserDto,
	): Promise<string>;
	abstract remove(userId: string): Promise<boolean>;
	abstract save(user: User): Promise<User>;
}
