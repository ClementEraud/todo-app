import { Store, createAsyncAction, errorResult, successResult } from 'pullstate';
import { CreateUserCommand } from './commands/CreateUserCommand';
import { IStore } from './interfaces/Store.interface';
import { MealPlanner } from './models/MealPlanner';
import { MealPlannerService } from '../providers/MealPlannerService';
import { UpdateMealPlannerCommand } from './commands/UpdateMealPlannerCommand';
import { User } from './models/User';
import { UserService } from '../providers/UserService';


export const store = new Store<IStore>({
	isDarkMode: true,
	token: undefined,
	currentUser: undefined,
});

export const getToken = () => {
	const token = store.getRawState().token;
	if(!token) {
		throw Error('Not Connected')
	}

	return token
}

interface IOLoginInput{
	username: string;
	password: string;
	rememberMe: boolean;
}

interface IOLoginOutput {
	token: string;
}

export const login = createAsyncAction<IOLoginInput, IOLoginOutput>(async ({username, password, rememberMe}) => {
	try {
		const result = await UserService.login(username, password, rememberMe);

		return successResult({token: result});
	} catch(err: any) {
		return errorResult([], err.message)
	}
});

interface IOGetCurrentUserOutput {
	currentUser: User;
}

export const getCurrentUser = createAsyncAction<never, IOGetCurrentUserOutput>(async () => {
	try {
		const token = getToken();
		const result = await UserService.getCurrentUser(token);

		return successResult({ currentUser: result });
	} catch(err: any) {
		return errorResult([], `Couldn't get current user: ${err.message}`);
	}
});

interface IOGetMealPlannerOutput {
	mealPlanner: MealPlanner;
}

export const getMealPlanner = createAsyncAction<never, IOGetMealPlannerOutput>(async () => {
	try {
		const token = getToken()
		const result = await UserService.getMealPlanner(token);

		return successResult({ mealPlanner: result });
	} catch(err: any) {
		return errorResult([], `Couldn't get current user: ${err.message}`);
	}
});

export const logout = () => UserService.logout();

interface IOSignUpUserOutput {
	createdUser: User;
}

export const signUpUser = createAsyncAction<CreateUserCommand, IOSignUpUserOutput>(async (user) => {
	try {
		const result = await UserService.signUp(user);

		return successResult({createdUser: result});
	} catch(err: any) {
		return errorResult([], err.message);
	}
});

interface IOUpdateMealPlannerOutput {
	mealPlanner: MealPlanner
}

export const updateMealPlanner = createAsyncAction<UpdateMealPlannerCommand, IOUpdateMealPlannerOutput>(async (command: UpdateMealPlannerCommand) => {
	try{
		const token = getToken();
		const result = await MealPlannerService.update(command, token);

		return successResult({mealPlanner: result});
	} catch(err: any) {
		return errorResult([], err.message)
	}
});
