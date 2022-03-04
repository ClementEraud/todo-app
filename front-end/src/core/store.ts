import { IStore } from './interfaces/Store.interface';
import { Store } from 'pullstate';

// try adding some dumb comment
export const store = new Store<IStore>({
	isDarkMode: true,
});
