import { IStore } from '../core/interfaces/Store.interface';
import { Store } from 'pullstate';
import { UserService } from '../providers/UserService';
import { getCurrentUser } from './async-actions/getCurrentUser';
import { loginUser } from './async-actions/loginUser';
import { signUp } from './async-actions/signUp';

export const TodoStore = new Store<IStore>({
	isDarkMode: true,
	token: sessionStorage.getItem('token')
		? sessionStorage.getItem('token')
		: localStorage.getItem('token'),
	currentUser: undefined,
});

const userService = new UserService();

export const actions = {
	loginUser: loginUser(userService),
	signUp: signUp(userService),
	getCurrentUser: getCurrentUser(userService),
};
