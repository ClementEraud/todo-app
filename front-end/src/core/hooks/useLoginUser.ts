import { IUserService } from '../ports/UserService.interface';
import { User } from './../models/User';

export const useLoginUser =
	(userService: IUserService) =>
	(onUserLoggedIn: (user: User) => void, onError: (err: Error) => void) => {
		const handleSubmit = (event: React.FormEvent) => {
			event.preventDefault();
			const data = new FormData(event.currentTarget as HTMLFormElement);

			userService
				.login(
					data.get('username') as string,
					data.get('password') as string,
					data.get('rememberMe') ? true : false,
				)
				.then(onUserLoggedIn)
				.catch(onError);
		};

		return [handleSubmit];
	};
