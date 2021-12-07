import { User } from '../models/User';

export abstract class IUserService {
	abstract getCurrentUser(): User | undefined;
	abstract login(username: string, password: string): Promise<User>;
}
