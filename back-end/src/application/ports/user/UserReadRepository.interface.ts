import { User } from '../../../domain/models/User';

export abstract class IUserReadRepository {
	abstract findAll(): Promise<User[]>;
	abstract findOne(userId: string): Promise<User>;
}
