import { IUserService } from '../ports/UserService.interface';
import { useNavigate } from 'react-router-dom';

export const useLogout = (userService: IUserService) => () => {
	const navigate = useNavigate();

	return () => {
		userService.logout();
		navigate('/');
	};
};
