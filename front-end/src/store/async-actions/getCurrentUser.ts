import { createAsyncAction, errorResult, successResult } from 'pullstate';
import { ApiError } from '../../providers/ApiError';
import { IUserService } from '../../core/ports/UserService.interface';
import { TodoStore } from '../store';

export const loginUser = (userService: IUserService) =>
	createAsyncAction(
		async () => {
			try {
				if (TodoStore.getRawState().currentUser) {
					return successResult(TodoStore.getRawState().currentUser);
				}
				return successResult(
					await userService.getCurrentUser(TodoStore.getRawState().token),
				);
			} catch (err) {
				const error = err as ApiError;
				return errorResult([error.code], error.message, error);
			}
		},
		{
			postActionHook: ({ result }) => {
				if (!result.error) {
					TodoStore.update(s => {
						s.currentUser = result.payload;
					});
				}
			},
		},
	);
