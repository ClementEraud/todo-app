import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { ApiError } from '../../providers/ApiError';
import { IUserService } from '../../core/ports/UserService.interface';
import { TodoStore } from '../store';

export const loginUser = (userService: IUserService) =>
	createAsyncAction(
		async ({ username, password, rememberMe }) => {
			try {
				const token = await userService.login(username, password);
				if (rememberMe) {
					localStorage.setItem('token', token);
				}

				return successResult(token);
			} catch (err) {
				const error = err as ApiError;
				return errorResult([error.code], error.message, error);
			}
		},
		{
			postActionHook: ({ result }) => {
				if (!result.error) {
					TodoStore.update(s => {
						s.token = result.payload;
					});
				}
			},
		},
	);
