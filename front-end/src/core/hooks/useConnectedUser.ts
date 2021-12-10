import { IUserService } from '../ports/UserService.interface';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useConnectedUser = (userService: IUserService) => () => {
	const currentUser = userService.getCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate('/');
		}
	});

	return currentUser;
};
