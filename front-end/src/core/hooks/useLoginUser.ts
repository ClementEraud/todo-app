import { IUserService } from '../ports/UserService.interface';
import { User } from './../models/User';
import { useState } from 'react';

export const useLoginUser =
	(userService: IUserService) =>
	(onUserLoggedIn: (user: User) => void, onError: (err: Error) => void) => {
		const [isLoading, setLoading] = useState(false);

		const handleSubmit = (event: React.FormEvent) => {
			setLoading(true);

			event.preventDefault();
			const data = new FormData(event.currentTarget as HTMLFormElement);

			userService
				.login(
					data.get('username') as string,
					data.get('password') as string,
					data.get('rememberMe') ? true : false,
				)
				.then((user: User) => {
					setLoading(false);
					onUserLoggedIn(user);
				})
				.catch((error: Error) => {
					setLoading(false);
					onError(error);
				});
		};

		return [handleSubmit, isLoading];
	};
