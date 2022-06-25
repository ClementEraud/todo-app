import { User } from '../models/User';

export interface IStore {
	isDarkMode: boolean;
	token: string | null;
	currentUser?: User;
}
