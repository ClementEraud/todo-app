import { IStore } from './interfaces/Store.interface';
import { Store } from 'pullstate';

export const store = new Store<IStore>({
	isDarkMode: true,
});
