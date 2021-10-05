import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../domain/models/User';

export abstract class IUserRepository {
	abstract insert(user: User): Promise<User>;
	abstract findAll(): Promise<User[]>;
	abstract findOne(userId: string): Promise<User>;
	abstract update(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
	abstract remove(userId: string): Promise<boolean>;
	abstract save(user: User): Promise<User>;
}
