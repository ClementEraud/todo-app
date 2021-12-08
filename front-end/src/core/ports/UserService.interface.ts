import { CreateUserCommand } from './../commands/CreateUserCommand';
import { User } from '../models/User';

export abstract class IUserService {
	abstract getCurrentUser(): User | undefined;
	abstract login(username: string, password: string): Promise<User>;
	abstract signUp(user: CreateUserCommand): Promise<User>;
}
