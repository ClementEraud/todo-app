import { CreateUserCommand } from '../commands/CreateUserCommand';
import { IUserService } from '../ports/UserService.interface';
import { User } from './../models/User';

export const useSignUpUser =
	(userService: IUserService) =>
	(onUserSignedUp: (user: User) => void, onError: (err: Error) => void) => {
		const signUpUser = (user: CreateUserCommand) => {
			userService.signUp(user).then(onUserSignedUp).catch(onError);
		};

		return [signUpUser];
	};
