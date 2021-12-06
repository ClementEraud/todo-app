import { User } from './../models/User';
import { UserService } from '../../services/UserService';

export const useLoginUser = (
	onUserLoggedIn: (user: User) => void,
	onError: (err: Error) => void,
) => {
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		UserService.login(
			data.get('username') as string,
			data.get('password') as string,
		)
			.then(onUserLoggedIn)
			.catch(onError);
	};

	return [handleSubmit];
};
